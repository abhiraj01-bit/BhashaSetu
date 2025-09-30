export default function About() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-3xl prose prose-slate dark:prose-invert">
        <h1>About</h1>
        <p>
          BhashaSetu is an AI/ML powered tool to extract Nepali and Sinhala text from images and PDFs, and translate it into fluent English. It is designed for offline-friendly internal networks using self-hosted backends like LibreTranslate, and supports on-device OCR.
        </p>
        <p>
          On this first version we focused on a fast, accessible workflow and modular architecture. Connect your preferred translation backend to enable high-quality, private translations.
        </p>
      </div>
    </section>
  );
}
