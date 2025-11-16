import express from "express";
import { QdrantClient } from "@qdrant/js-client-rest";


const app = express();
app.use(express.json());


const client = new QdrantClient({ url: "http://qdrant:6333" });


app.get("/health", (req, res) => res.json({ status: "ok", service: "memory-service" }));


app.post("/memory/save", async (req, res) => {
const { text, vector } = req.body;


await client.upsert("memory", {
points: [
{
id: Date.now(),
vector,
payload: { text }
}
]
});


res.json({ success: true });
});


app.post("/memory/query", async (req, res) => {
const { vector } = req.body;


const result = await client.search("memory", {
vector,
limit: 3,
});


res.json(result);
});


app.listen(5100, () => console.log("Memory service running on 5100"));