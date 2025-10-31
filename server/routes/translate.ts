import type { RequestHandler } from "express";
import type { TranslateRequest, TranslateResponse } from "@shared/api";

const has = (s?: string) => typeof s === "string" && s.length > 0;

export const handleTranslate: RequestHandler = async (req, res) => {
  try {
    const body = req.body as TranslateRequest;
    if (!body?.text || body.target !== "en") {
      res.status(400).send("Invalid payload");
      return;
    }

    const source = body.source;

    // Prefer Google Gemini if configured (requested priority)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (has(geminiKey)) {
      const result = await translateWithGemini(geminiKey!, body);
      res.json(result);
      return;
    }

    // Prefer LibreTranslate if configured (can be self-hosted offline)
    const libreUrl = process.env.LIBRETRANSLATE_URL;
    const libreKey = process.env.LIBRETRANSLATE_API_KEY;
    if (has(libreUrl)) {
      const result = await translateWithLibre(libreUrl!, libreKey, body);
      res.json(result);
      return;
    }

    // Try Hugging Face Inference (models for ne->en, si->en)
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (has(hfKey)) {
      const result = await translateWithHuggingFace(hfKey!, body);
      res.json(result);
      return;
    }

    // Try OpenAI as last resort
    const openaiKey = process.env.OPENAI_API_KEY;
    if (has(openaiKey)) {
      const result = await translateWithOpenAI(openaiKey!, body);
      res.json(result);
      return;
    }

    const resp: TranslateResponse = {
      translatedText: body.text,
      provider: "none",
      detectedSource: source === "auto" ? "unknown" : (source as any),
    };
    res.json(resp);
  } catch (e: any) {
    res.status(500).send(e?.message || "Translation error");
  }
};

async function translateWithLibre(url: string, apiKey: string | undefined, body: TranslateRequest): Promise<TranslateResponse> {
  const resp = await fetch(new URL("/translate", url).toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      q: body.text,
      source: body.source === "auto" ? "auto" : mapLangToLibre(body.source),
      target: body.target,
      format: "text",
    }),
  });
  if (!resp.ok) throw new Error(`LibreTranslate failed: ${resp.status}`);
  const data = await resp.json();
  const translated = (data as any).translatedText ?? (Array.isArray(data) ? data[0]?.translatedText : "");
  return { translatedText: translated, provider: "libre" };
}

async function translateWithHuggingFace(apiKey: string, body: TranslateRequest): Promise<TranslateResponse> {
  const model = body.source === "si" ? "Helsinki-NLP/opus-mt-si-en" : body.source === "ne" ? "Helsinki-NLP/opus-mt-ne-en" : "Helsinki-NLP/opus-mt-mul-en";
  const resp = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: body.text })
  });
  if (!resp.ok) throw new Error(`HF failed: ${resp.status}`);
  const data = await resp.json();
  const translated = Array.isArray(data) ? (data[0]?.translation_text ?? "") : "";
  return { translatedText: translated, provider: "huggingface" };
}

async function translateWithOpenAI(apiKey: string, body: TranslateRequest): Promise<TranslateResponse> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const sourceLang = getLanguageName(body.source);
  const targetLang = getLanguageName(body.target);
  const prompt = `Translate the following ${sourceLang} text to natural, fluent ${targetLang}. Preserve formatting and line breaks.\n\nTEXT:\n${body.text}`;
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "You are a high-quality literary translator to English." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    }),
  });
  if (!r.ok) throw new Error(`OpenAI failed: ${r.status}`);
  const data = await r.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  return { translatedText: text, provider: "openai" };
}

async function translateWithGemini(apiKey: string, body: TranslateRequest): Promise<TranslateResponse> {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
  const sourceLang = getLanguageName(body.source);
  const targetLang = getLanguageName(body.target);
  const prompt = `Translate the following ${sourceLang} text into natural ${targetLang}. Preserve line breaks and formatting.`;
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

function mapLangToLibre(src: string) {
  return src;
}

function getLanguageName(code: string) {
  const langMap: Record<string, string> = {
    'en': 'English', 'ne': 'Nepali', 'si': 'Sinhala', 'hi': 'Hindi', 'bn': 'Bengali',
    'ta': 'Tamil', 'te': 'Telugu', 'ml': 'Malayalam', 'kn': 'Kannada', 'gu': 'Gujarati',
    'pa': 'Punjabi', 'ur': 'Urdu', 'zh': 'Chinese', 'ja': 'Japanese', 'ko': 'Korean',
    'ar': 'Arabic', 'fr': 'French', 'de': 'German', 'es': 'Spanish', 'pt': 'Portuguese',
    'ru': 'Russian', 'it': 'Italian', 'tr': 'Turkish', 'th': 'Thai', 'vi': 'Vietnamese',
    'id': 'Indonesian', 'ms': 'Malay', 'tl': 'Filipino', 'my': 'Myanmar', 'km': 'Khmer', 'lo': 'Lao'
  };
  return langMap[code] || code;
}
