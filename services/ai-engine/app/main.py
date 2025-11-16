from fastapi import FastAPI
import uvicorn

app = FastAPI()

import requests

MEMORY_URL = "http://memory-service:5100"

def save_memory(text: str):
    try:
        requests.post(f"{MEMORY_URL}/memory/save", json={
            "text": text,
            "vector": [0.1, 0.3, 0.5]  # placeholder
        })
    except:
        pass

def query_memory():
    try:
        result = requests.post(f"{MEMORY_URL}/memory/query", json={
            "vector": [0.1, 0.3, 0.5]
        })
        return result.json()
    except:
        return {}
@app.post("/generate")
async def generate(data: dict):
    prompt = data.get("prompt", "")

    emotion = detect_emotion(prompt)
return {
    "response": llm_text,
    "emotion": emotion
}


    # query memory
    mem = query_memory()

    # dummy AI
    reply = f"Response to: {prompt}"

    # save memory
    save_memory(prompt)

    return {
        "response": reply,
        "related_memory": mem
    }
TTS_URL = "http://tts-service:8200/speak"
ALIGN_URL = "http://forced-aligner:8300/visemes"

@app.post("/full")
async def full_pipeline(data: dict):
    text = data.get("prompt", "")

    # AI response
    ai_res = f"This is a response to: {text}"

    # TTS
    tts_res = requests.post(TTS_URL, json={"text": ai_res}).json()

    # Align
    align_res = requests.post(ALIGN_URL, json={"text": ai_res}).json()

    return {
        "prompt": text,
        "ai_response": ai_res,
        "audio": tts_res["audio_url"],
        "visemes": align_res["visemes"]
    }
