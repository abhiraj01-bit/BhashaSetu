import express from 'express';
import cors from 'cors';
import { handleDemo } from './demo.js';
import { handleTranslate } from './translate.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ status: "BhashaSetu API is running" });
});

app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});

app.get("/api/demo", handleDemo);
app.post("/api/translate", handleTranslate);

export default app;