import express from "express";
import axios from "axios";
import { sendToAI } from "./ai.js";


const app = express();
app.use(express.json());


app.get("/health", (req, res) => res.json({ status: "ok", service: "backend" }));


app.post("/ai/message", async (req, res) => {
const { message } = req.body;
const aiResponse = await sendToAI(message);


res.json({
input: message,
ai: aiResponse.response
});
});


// Full avatar pipeline
app.post("/ai/full-pipeline", async (req, res) => {
const { message } = req.body;


const aiRes = await axios.post("http://ai-engine:8000/generate", {
prompt: message,
});


const tts = await axios.post("http://ai-engine:8000/tts", {
text: aiRes.data.response,
});


const visemes = await axios.post("http://ai-engine:8000/visemes", {
text: aiRes.data.response,
});


res.json({
query: message,
response: aiRes.data.response,
emotion: aiRes.data.emotion,
audio: tts.data.audio_url,
visemes: visemes.data.visemes,
});
});


app.listen(4000, () => console.log("Backend running on port 4000"));