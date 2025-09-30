/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type SourceLang = "ne" | "si" | "auto";

export interface TranslateRequest {
  text: string;
  source: SourceLang; // "ne" (Nepali), "si" (Sinhala), or "auto"
  target: "en"; // fixed target English for this app
}

export interface TranslateResponse {
  translatedText: string;
  provider: "gemini" | "libre" | "openai" | "huggingface" | "none";
  detectedSource?: "ne" | "si" | "en" | "unknown";
}
