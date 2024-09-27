from backend.whisper_model import WhisperMo

import io
import librosa

import subprocess
import uvicorn

from os import getenv, path
from dotenv import load_dotenv

from fastapi import FastAPI, Request, File, Form, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

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


app = FastAPI()
app.mount("/public", StaticFiles(directory=app_public), name="public")
templates = Jinja2Templates(directory=app_public)

whisper = WhisperMo(model_name="tiny")


@app.post("/api/transcribe")
async def audio_to_text(timestamp: str = Form(), audio: UploadFile = File()):
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
