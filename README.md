# 🌉 BhashaSetu (भाषा सेतु)

<div align="center">

![BhashaSetu Logo](https://img.shields.io/badge/BhashaSetu-Language%20Bridge-blue?style=for-the-badge&logo=translate&logoColor=white)

**AI-Powered OCR & Translation for Nepali & Sinhala Languages**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-success?style=for-the-badge)](https://bhasha-setu-orcin.vercel.app/)
[![GitHub](https://img.shields.io/github/license/abhiraj01-bit/BhashaSetu?style=for-the-badge)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

*Breaking language barriers with advanced OCR and AI-powered translation*

</div>

---

## 🎯 What is BhashaSetu?

**BhashaSetu** (भाषा सेतु) means "Language Bridge" in Nepali. It's a cutting-edge web application that bridges the gap between South Asian languages and English through:

- 🔍 **Advanced OCR** - Extract text from images and PDFs with high accuracy
- 🤖 **AI Translation** - Powered by Google Gemini for natural, context-aware translations
- 📱 **Modern Interface** - Beautiful, responsive design with dark/light themes
- 📊 **Research Tools** - Export parallel corpora for academic and research purposes

## ✨ Key Features

### 🖼️ Intelligent OCR
- **Multi-format Support**: Images (JPG, PNG) and PDF documents
- **Script Optimization**: Specialized for Devanagari (नेपाली) and Sinhala (සිංහල) scripts
- **Real-time Progress**: Live progress tracking with visual feedback
- **Client-side Processing**: Secure, privacy-first approach

### 🌐 AI-Powered Translation
- **Source Languages**: Nepali (नेपाली), Sinhala (සිංහල)
- **Target Language**: English
- **Auto-detection**: Intelligent script detection
- **High Quality**: Powered by Google Gemini AI/ML models

### 📤 Export & Research Tools
- **Multiple Formats**: Plain text, TSV parallel corpora
- **Research Ready**: Perfect for linguistic research and model training
- **Batch Processing**: Handle multiple documents efficiently
- **Editable Results**: Refine translations before export

### 🎨 Modern User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Theme Support**: Light, dark, and system themes
- **Smooth Animations**: Powered by Framer Motion
- **Accessibility**: Built with accessibility in mind

## 🚀 Live Demo

Experience BhashaSetu in action: **[bhasha-setu-orcin.vercel.app](https://bhasha-setu-orcin.vercel.app/)**

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### Backend
- **Express.js** - Fast, minimalist web framework
- **Vercel Functions** - Serverless API endpoints
- **Google Gemini API** - AI-powered translation

### OCR & Processing
- **Tesseract.js** - Client-side OCR engine
- **PDF.js** - PDF processing and rendering
- **Canvas API** - Image manipulation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhiraj01-bit/BhashaSetu.git
   cd BhashaSetu
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Add your Gemini API key to .env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:8080
   ```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run test suite |
| `pnpm typecheck` | TypeScript validation |
| `pnpm format.fix` | Format code with Prettier |

## 🌍 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key

### Other Platforms
- **Netlify**: Use `netlify.toml` configuration
- **Docker**: Dockerfile included for containerization
- **Self-hosted**: Build and serve static files

## 📁 Project Structure

```
mystic-den/
├── 📁 client/                 # React frontend
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 ui/            # Base UI components (Radix UI)
│   │   ├── Layout.tsx        # Main layout with navigation
│   │   ├── ThemeProvider.tsx # Theme management
│   │   └── ThemeToggle.tsx   # Theme selection
│   ├── 📁 pages/             # Route components
│   │   ├── Index.tsx         # Main application page
│   │   ├── About.tsx         # About page
│   │   └── NotFound.tsx      # 404 page
│   ├── 📁 lib/               # Utilities and helpers
│   │   ├── ocr.ts           # OCR functionality
│   │   ├── translate.ts     # Translation API
│   │   └── utils.ts         # Common utilities
│   └── 📁 hooks/             # Custom React hooks
├── 📁 server/                # Express backend
│   ├── 📁 routes/           # API route handlers
│   └── index.ts             # Server configuration
├── 📁 api/                   # Vercel serverless functions
├── 📁 shared/               # Shared types and utilities
└── 📁 public/               # Static assets
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/translate` | POST | Translate text using AI |
| `/api/ping` | GET | Health check endpoint |
| `/api/demo` | GET | Demo endpoint |

### Translation API Usage

```typescript
// Request
POST /api/translate
{
  "text": "नमस्ते संसार",
  "source": "ne",
  "target": "en"
}

// Response
{
  "translatedText": "Hello World",
  "provider": "gemini",
  "detectedSource": "ne"
}
```

## 🎨 Customization

### Themes
The application supports three theme modes:
- **Light** (default) - Clean, bright interface
- **Dark** - Dark interface for low-light environments  
- **System** - Automatically follows OS preference

### Styling
- Modify `client/global.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Component styles use Tailwind CSS classes

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tesseract.js** - Powerful OCR engine
- **Google Gemini** - Advanced AI translation
- **Radix UI** - Accessible component library
- **Vercel** - Seamless deployment platform
- **Open Source Community** - For amazing tools and libraries

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/abhiraj01-bit/BhashaSetu/issues)
- **Discussions**: [GitHub Discussions](https://github.com/abhiraj01-bit/BhashaSetu/discussions)
- **Email**: [Contact Developer](mailto:your-email@example.com)

---

<div align="center">

**Made with ❤️ for the South Asian language community**

[![Star this repo](https://img.shields.io/github/stars/abhiraj01-bit/BhashaSetu?style=social)](https://github.com/abhiraj01-bit/BhashaSetu)
[![Follow on GitHub](https://img.shields.io/github/followers/abhiraj01-bit?style=social)](https://github.com/abhiraj01-bit)

</div>