import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { translateText, download } from "@/lib/translate";
import { detectScript, ocrImage, ocrPdf, type OcrProgress } from "@/lib/ocr";
import type { TranslateRequest } from "@shared/api";
import { motion } from "motion/react";

type Mode = "file" | "text";

type UploadState = {
  file?: File;
  text?: string;
  lang: string;
  target: string;
};

const languages = [
  { code: "auto", name: "Auto Detect" },
  { code: "en", name: "English" },
  { code: "ne", name: "Nepali (नेपाली)" },
  { code: "si", name: "Sinhala (සිංහල)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "es", name: "Spanish (Español)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "tr", name: "Turkish (Türkçe)" },
  { code: "th", name: "Thai (ไทย)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
  { code: "id", name: "Indonesian (Bahasa Indonesia)" },
  { code: "ms", name: "Malay (Bahasa Melayu)" },
  { code: "tl", name: "Filipino (Tagalog)" },
  { code: "my", name: "Myanmar (မြန်မာ)" },
  { code: "km", name: "Khmer (ខ្មែរ)" },
  { code: "lo", name: "Lao (ລາວ)" }
];

export default function Index() {
  const [mode, setMode] = useState<Mode>("file");
  const [upload, setUpload] = useState<UploadState>({ lang: "auto", target: "en" });
  const [ocrOut, setOcrOut] = useState<string>("");
  const [translated, setTranslated] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<OcrProgress | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPdf = useMemo(() => upload.file?.type === "application/pdf" || (upload.file?.name?.toLowerCase()?.endsWith(".pdf") ?? false), [upload.file]);

  useEffect(() => {
    setTranslated("");
  }, [ocrOut]);

  async function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setUpload((u) => ({ ...u, file: f }));
  }

  async function runOcr() {
    if (!upload.file && mode === "file") return;
    setBusy(true);
    setTranslated("");
    setOcrOut("");
    try {
      if (mode === "text") {
        setOcrOut(upload.text ?? "");
      } else if (upload.file) {
        const lang = upload.lang === "ne" ? "nep" : upload.lang === "si" ? "sin" : "auto";
        const fn = isPdf ? ocrPdf : ocrImage;
        const out = await fn(upload.file, lang as any, (p) => setProgress(p));
        setOcrOut(out.text.trim());
      }
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function doTranslate() {
    if (!ocrOut.trim()) return;
    setBusy(true);
    try {
      const detected = detectScript(ocrOut);
      const req: TranslateRequest = {
        text: ocrOut,
        source: upload.lang === "auto" ? (detected === "nep" ? "ne" : detected === "sin" ? "si" : "auto") : upload.lang,
        target: upload.target,
      } as TranslateRequest;
      const resp = await translateText(req);
      setTranslated(resp.translatedText);
    } catch (e: any) {
      alert(e.message || "Translation failed");
    } finally {
      setBusy(false);
    }
  }

  function resetAll() {
    setUpload({ lang: "auto", target: "en" });
    setOcrOut("");
    setTranslated("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="container relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900/90 mix-blend-multiply dark:text-white"
            >
              AI/ML OCR + Language Translation
            </motion.h1>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg" onClick={() => document.getElementById("try")?.scrollIntoView({ behavior: "smooth" })}>Get Started</Button>
              <Button size="lg" variant="outline" onClick={resetAll}>Reset</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Offline-ready" desc="Use self-hosted LibreTranslate and local OCR for secure, internal networks."/>
          <FeatureCard title="Multi-script OCR" desc="Advanced OCR supporting 30+ languages including Devanagari, Latin, Arabic, and Asian scripts."/>
          <FeatureCard title="Parallel Export" desc="Create TSV parallel corpora for training and fine-tuning translation models."/>
        </div>
      </section>

      <section id="try" className="container py-12 md:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="rounded-xl border bg-card/60 backdrop-blur p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 rounded-full bg-accent/60 px-3 py-1 text-xs text-muted-foreground">
                <button className={`px-2 py-0.5 rounded-full ${mode === "file" ? "bg-background text-foreground" : ""}`} onClick={() => setMode("file")}>
                  Image/PDF OCR
                </button>
                <button className={`px-2 py-0.5 rounded-full ${mode === "text" ? "bg-background text-foreground" : ""}`} onClick={() => setMode("text")}>
                  Paste Text
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <label className="text-muted-foreground">From</label>
                <select
                  className="rounded-md border bg-background px-2 py-1 max-w-[120px]"
                  value={upload.lang}
                  onChange={(e) => setUpload((u) => ({ ...u, lang: e.target.value }))}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
                <span className="text-muted-foreground">→</span>
                <label className="text-muted-foreground">To</label>
                <select
                  className="rounded-md border bg-background px-2 py-1 max-w-[120px]"
                  value={upload.target}
                  onChange={(e) => setUpload((u) => ({ ...u, target: e.target.value }))}
                >
                  {languages.filter(lang => lang.code !== "auto").map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {mode === "file" ? (
              <div className="mt-4">
                <label
                  htmlFor="file"
                  className="group flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-accent/40 text-center hover:bg-accent/60"
                >
                  <input ref={inputRef} id="file" type="file" accept="image/*,application/pdf" className="hidden" onChange={handleSelectFile} />
                  <div className="text-sm text-muted-foreground">
                    {upload.file ? (
                      <div>
                        <p className="text-foreground font-medium">{upload.file.name}</p>
                        <p>{(upload.file.size / 1024 / 1024).toFixed(2)} MB {isPdf ? "PDF" : "Image"}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-foreground">Drop a file or click to upload</p>
                        <p>Images (JPG/PNG) or PDF</p>
                      </div>
                    )}
                  </div>
                </label>
                <div className="mt-4 flex gap-3">
                  <Button onClick={runOcr} disabled={busy || (!upload.file && mode === "file")}>Run OCR</Button>
                  <Button variant="secondary" onClick={() => setUpload((u) => ({ ...u, file: undefined }))} disabled={busy}>Clear</Button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <textarea
                  className="w-full min-h-48 rounded-md border bg-background p-3 font-mono text-sm"
                  placeholder="Paste text in any language here..."
                  value={upload.text ?? ""}
                  onChange={(e) => setUpload((u) => ({ ...u, text: e.target.value }))}
                />
                <div className="mt-4 flex gap-3">
                  <Button onClick={runOcr} disabled={busy || !(upload.text ?? "").trim()}>Use This Text</Button>
                  <Button variant="secondary" onClick={() => setUpload((u) => ({ ...u, text: "" }))} disabled={busy}>Clear</Button>
                </div>
              </div>
            )}

            {progress && (
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{progress.status}</span>
                  <span>{Math.round(progress.progress * 100)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded bg-accent">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" style={{ width: `${progress.progress * 100}%` }} />
                </div>
              </div>
            )}

            {ocrOut && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold">Extracted Text</h3>
                <textarea className="mt-2 w-full min-h-40 rounded-md border bg-background p-3 font-mono text-sm" value={ocrOut} onChange={(e) => setOcrOut(e.target.value)} />
                <div className="mt-3 flex flex-wrap gap-3">
                  <Button onClick={doTranslate} disabled={busy}>Translate → {languages.find(l => l.code === upload.target)?.name || 'Target Language'}</Button>
                  <Button variant="outline" onClick={() => download(ocrOut, `ocr_${Date.now()}.txt`)}>Download OCR</Button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-card/60 backdrop-blur p-6">
            <h3 className="text-lg font-semibold">{languages.find(l => l.code === upload.target)?.name || 'Target Language'} Translation</h3>
            <p className="text-sm text-muted-foreground">Edit to correct and export for training.</p>
            <textarea
              className="mt-3 w-full min-h-80 rounded-md border bg-background p-3 font-mono text-sm"
              placeholder="Translation will appear here..."
              value={translated}
              onChange={(e) => setTranslated(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => download(translated, `translation_${Date.now()}.txt`)} disabled={!translated.trim()}>Download Translation</Button>
              <Button variant="secondary" onClick={() => download(makeParallel(ocrOut, translated), `parallel_${Date.now()}.tsv`)} disabled={!translated.trim() || !ocrOut.trim()}>Export Parallel TSV</Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card/60 p-5">
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function makeParallel(src: string, tgt: string) {
  const s = src.split(/\n+/);
  const t = tgt.split(/\n+/);
  const rows = [] as string[];
  const n = Math.max(s.length, t.length);
  for (let i = 0; i < n; i++) rows.push(`${escapeTab(s[i] || "")}\t${escapeTab(t[i] || "")}`);
  return rows.join("\n");
}

function escapeTab(x: string) {
  return (x || "").replace(/\t/g, " ").replace(/\r/g, " ");
}
