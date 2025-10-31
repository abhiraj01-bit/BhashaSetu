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

export type SourceLang = string | "auto";
export type TargetLang = string;

export interface TranslateRequest {
  text: string;
  source: SourceLang; // any language code or "auto"
  target: TargetLang; // any target language
}

export interface TranslateResponse {
  translatedText: string;
  provider: "gemini" | "libre" | "openai" | "huggingface" | "none";
  detectedSource?: string;
}
