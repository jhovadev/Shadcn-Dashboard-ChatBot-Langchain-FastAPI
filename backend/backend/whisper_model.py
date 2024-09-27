from faster_whisper import WhisperModel


class WhisperMo:
    def __init__(self, model_name="small"):
        self.model = WhisperModel(model_name, device="cpu", compute_type="int8")

    def transcribe(self, audio_path):
        segments, info = self.model.transcribe(audio_path, language="es", beam_size=5)

        print(
            "Detected language '%s' with probability %f"
            % (info.language, info.language_probability)
        )
        # for segment in segments:
        #    print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))

        transcription = "".join(segment.text for segment in segments)
        print(transcription)
        return transcription
