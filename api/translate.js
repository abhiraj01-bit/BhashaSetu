const has = (s) => typeof s === "string" && s.length > 0;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body;
    if (!body?.text || body.target !== "en") {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const source = body.source;

    // Try Gemini first
    const geminiKey = process.env.GEMINI_API_KEY;
    if (has(geminiKey)) {
      try {
        const result = await translateWithGemini(geminiKey, body);
        res.json(result);
        return;
      } catch (error) {
        console.error('Gemini error:', error);
      }
    }

    // Fallback response
    const resp = {
      translatedText: body.text,
      provider: "none",
      detectedSource: source === "auto" ? "unknown" : source,
    };
    res.json(resp);
  } catch (e) {
    console.error('Translation error:', e);
    res.status(500).json({ error: e?.message || "Translation error" });
  }
}

async function translateWithGemini(apiKey, body) {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash-exp";
  const sourceLang = getLanguageName(body.source);
  const targetLang = getLanguageName(body.target);
  const prompt = `Translate the following ${sourceLang} text into natural ${targetLang}. Preserve line breaks and formatting.`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: `${prompt}

TEXT:
${body.text}` }] }
      ],
      generationConfig: { temperature: 0.2 }
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API failed: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  
  if (!text) {
    throw new Error("No translation text received from Gemini");
  }
  
  return { translatedText: text, provider: "gemini" };
}

function getLanguageName(code) {
  const langMap = {
    'en': 'English', 'ne': 'Nepali', 'si': 'Sinhala', 'hi': 'Hindi', 'bn': 'Bengali',
    'ta': 'Tamil', 'te': 'Telugu', 'ml': 'Malayalam', 'kn': 'Kannada', 'gu': 'Gujarati',
    'pa': 'Punjabi', 'ur': 'Urdu', 'zh': 'Chinese', 'ja': 'Japanese', 'ko': 'Korean',
    'ar': 'Arabic', 'fr': 'French', 'de': 'German', 'es': 'Spanish', 'pt': 'Portuguese',
    'ru': 'Russian', 'it': 'Italian', 'tr': 'Turkish', 'th': 'Thai', 'vi': 'Vietnamese',
    'id': 'Indonesian', 'ms': 'Malay', 'tl': 'Filipino', 'my': 'Myanmar', 'km': 'Khmer', 'lo': 'Lao'
  };
  return langMap[code] || code;
}