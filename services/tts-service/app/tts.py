from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "service": "tts-service"}

@app.post("/speak")
async def speak(data: dict):
    text = data.get("text", "")
    return {"audio_url": f"/mock/audio/{text.replace(' ', '_')}.wav"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8200)
