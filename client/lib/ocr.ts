// Lightweight OCR helpers built on Tesseract.js default API
import Tesseract from "tesseract.js";

export type OcrProgress = {
  status: string;
  progress: number; // 0..1
};

export type OcrResult = {
  text: string;
  pages: Array<{ index: number; text: string }>;
};

export async function ocrImage(
  file: File,
  lang: "nep" | "sin" | "auto",
  onProgress?: (p: OcrProgress) => void,
  langPath?: string,
): Promise<OcrResult> {
  const targetLang = lang === "auto" ? await detectLangFromImage(file) : lang;
  const image = URL.createObjectURL(file);
  try {
    const { data } = await Tesseract.recognize(image, mapLang(targetLang), {
      logger: (m: any) => {
        if (onProgress && typeof m?.progress === "number") onProgress({ status: m.status ?? "", progress: m.progress });
      },
      langPath: langPath ?? "https://tessdata.projectnaptha.com/4.0.0",
    } as any);
    return { text: data.text, pages: [{ index: 0, text: data.text }] };
  } finally {
    URL.revokeObjectURL(image);
  }
}

export async function ocrPdf(
  file: File,
  lang: "nep" | "sin" | "auto",
  onProgress?: (p: OcrProgress) => void,
  langPath?: string,
): Promise<OcrResult> {
  const pdfjs: any = await import("pdfjs-dist");
  const workerSrc: any = await import("pdfjs-dist/build/pdf.worker.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  const arrayBuf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuf }).promise;

  const pagesTexts: Array<{ index: number; text: string }> = [];
  let combined = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/png"));
    const imageFile = new File([blob], `page-${i}.png`, { type: "image/png" });
    const { text } = await ocrImage(imageFile, lang, (p) => {
      if (onProgress) onProgress({ status: `OCR page ${i}/${pdf.numPages}: ${p.status}`, progress: (i - 1 + p.progress) / pdf.numPages });
    }, langPath);

    pagesTexts.push({ index: i - 1, text });
    combined += (combined ? "\n\n" : "") + text;
  }

  return { text: combined, pages: pagesTexts };
}

export function detectScript(text: string): "nep" | "sin" | "latin" | "unknown" {
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0x0900 && code <= 0x097F) return "nep"; // Devanagari
    if (code >= 0x0D80 && code <= 0x0DFF) return "sin"; // Sinhala
    if ((code >= 0x0041 && code <= 0x007A) || (code >= 0x00C0 && code <= 0x024F)) return "latin";
  }
  return "unknown";
}

async function detectLangFromImage(_file: File): Promise<"nep" | "sin"> {
  return "nep";
}

function mapLang(lang: "nep" | "sin") {
  return lang === "nep" ? "nep" : "sin";
}
