import { WebSocketServer } from "ws";
}


wss.on("connection", (ws) => {
console.log("Client connected to realtime engine");


ws.on("message", async (raw) => {
const msg = raw.toString();


// Plain text message → full AI pipeline
if (!msg.startsWith("{")) {
const result = await axios.post("http://backend:4000/ai/full-pipeline", {
message: msg,
});


broadcast({ type: "avatar_output", data: result.data });
return;
}


// Audio stream handling
const pkg = JSON.parse(msg);
if (pkg.type === "audio_chunk") {
const sttRes = await axios.post("http://stt-service:8100/transcribe", {
audio: pkg.data,
});


const result = await axios.post("http://backend:4000/ai/full-pipeline", {
message: sttRes.data.text,
});


broadcast({ type: "avatar_output", data: result.data });
}
});
});


console.log("Realtime Engine running on port 5000");