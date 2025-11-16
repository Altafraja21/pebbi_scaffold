import axios from "axios";


const AI_ENGINE_URL = "http://ai-engine:8000";


export async function sendToAI(prompt: string) {
const res = await axios.post(`${AI_ENGINE_URL}/generate`, { prompt });
return res.data;
}