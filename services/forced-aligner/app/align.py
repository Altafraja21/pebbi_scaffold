from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "service": "forced-aligner"}

@app.post("/visemes")
async def visemes(data: dict):
    text = data.get("text", "")

    return {
        "visemes": [
            {"time": 0.0, "value": "A"},
            {"time": 0.2, "value": "E"},
            {"time": 0.4, "value": "O"},
        ],
        "input": text
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8300)
