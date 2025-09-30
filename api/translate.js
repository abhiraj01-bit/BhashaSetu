const has = (s) => typeof s === "string" && s.length > 0;

export const handleTranslate = async (req, res) => {
  try {
    const body = req.body;
    if (!body?.text || body.target !== "en") {
      res.status(400).send("Invalid payload");
      return;
    }

    const source = body.source;

    const geminiKey = process.env.GEMINI_API_KEY;
    if (has(geminiKey)) {
      const result = await translateWithGemini(geminiKey, body);
      res.json(result);
      return;
    }

    const libreUrl = process.env.LIBRETRANSLATE_URL;
    const libreKey = process.env.LIBRETRANSLATE_API_KEY;
    if (has(libreUrl)) {
      const result = await translateWithLibre(libreUrl, libreKey, body);
      res.json(result);
      return;
    }

    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (has(hfKey)) {
      const result = await translateWithHuggingFace(hfKey, body);
      res.json(result);
      return;
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (has(openaiKey)) {
      const result = await translateWithOpenAI(openaiKey, body);
      res.json(result);
      return;
    }

    const resp = {
      translatedText: body.text,
      provider: "none",
      detectedSource: source === "auto" ? "unknown" : source,
    };
    res.json(resp);
  } catch (e) {
    res.status(500).send(e?.message || "Translation error");
  }
};

async function translateWithGemini(apiKey, body) {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
  const prompt = `Translate the following ${body.source === "si" ? "Sinhala" : body.source === "ne" ? "Nepali" : "Nepali or Sinhala"} text into natural English. Preserve line breaks.`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: `${prompt}\n\nTEXT:\n${body.text}` }] }
      ],
      generationConfig: { temperature: 0.2 }
    }),
  });
  if (!r.ok) throw new Error(`Gemini failed: ${r.status}`);
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { translatedText: text, provider: "gemini" };
}