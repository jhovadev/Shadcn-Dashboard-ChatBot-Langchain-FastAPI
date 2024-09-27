from backend.whisper_model import WhisperMo
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.tools import Tool

import logging

import io
import asyncio
import librosa

import subprocess
import uvicorn

from os import getenv, path
from dotenv import load_dotenv

from fastapi import FastAPI, Request, File, Form, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Usa logger.info(), logger.error() en lugar de print

app_base = path.dirname(__file__)
app_root = path.join(app_base, "../")
app_public = path.join(app_base, "public/")

load_dotenv(dotenv_path=path.join(app_root, ".env"))

app_env = getenv("APP_ENVIRONMENT")
app_host = getenv("APP_HTTP_HOST")
app_port = int(getenv("APP_HTTP_PORT"))
app_spa_folder = path.join(app_root, getenv("APP_SPA_FOLDER_ROOT"))
app_spa_proxy_url = getenv("APP_SPA_PROXY_URL")
app_spa_proxy_launch_cmd = getenv("APP_SPA_PROXY_LAUNCH_CMD")
gemini_api_key = getenv("GEMINI_API_KEY")

app = FastAPI()
""" 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 """
app.mount("/public", StaticFiles(directory=app_public), name="public")
templates = Jinja2Templates(directory=app_public)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0,
    timeout=None,
    verbose=True,
    api_key=gemini_api_key,
    streaming=True,
)


class Question(BaseModel):
    prompt: str


@app.post("/api/chat")
async def chat(question: Question):
    try:
        print(question)

        def generator(prompt: str):
            for item in llm.stream(prompt):
                logger.info(item)
                yield item.content

        return StreamingResponse(
            generator(question.prompt), media_type="text/event-stream"
        )

    except Exception as e:
        return {"error": str(e)}


whisper = WhisperMo(model_name="small")


@app.post("/api/transcribe")
async def audio_to_text(timestamp: str = Form(), audio: UploadFile = File()):
    """if audio.content_type not in [
        "audio/wav",
        "audio/mp3",
    ]:  # Ajusta según tus necesidades
        return {"error": "Formato de audio no soportado."}
    """
    bt = audio.file.read()
    memory_file = io.BytesIO(bt)
    data, sample_rate = librosa.load(memory_file)
    resample_data = librosa.resample(data, orig_sr=sample_rate, target_sr=16000)
    text = whisper.transcribe(resample_data)
    print(text)

    return {
        "text": text,
    }


@app.get("/api/reply")
def reply(value: str):
    print(f"reply: {value}")
    return {"reply": value}


@app.get("/{full_path:path}")
async def serve_spa_app(request: Request, full_path: str):
    """Serve the react app
    `full_path` variable is necessary to serve each possible endpoint with
    `index.html` file in order to be compatible with `react-router-dom
    """
    if app_env.lower() == "development":
        return RedirectResponse(app_spa_proxy_url)

    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    # Launching the SPA proxy server
    if app_env.lower() == "development":
        print("Launching the SPA proxy server...", app_spa_folder)
        spa_process = subprocess.Popen(
            args=app_spa_proxy_launch_cmd.split(" "), cwd=app_spa_folder, shell=True
        )

    uvicorn.run("main:app", host=app_host, reload=True, port=app_port)
