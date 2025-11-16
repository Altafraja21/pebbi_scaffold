from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "service": "stt-service"}

@app.post("/transcribe")
async def transcribe():
    return {"text": "This is a mock transcription."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8100)
