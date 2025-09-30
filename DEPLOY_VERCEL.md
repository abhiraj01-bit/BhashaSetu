# Deploy to Vercel

## Quick Deploy Steps

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `GEMINI_API_KEY` = `AIzaSyBB12hy-w0e5Xc6BkFtZqr1thFf1l02KU4`

## Configuration Added

- ✅ `vercel.json` - API routing and SPA support
- ✅ `api/index.js` - Serverless function handler
- ✅ Updated build script for Vercel
- ✅ Health check endpoint added

## After Deployment

Your app will be available at: `https://your-app-name.vercel.app`

API endpoints:
- `/api/ping` - Test endpoint
- `/api/translate` - Translation service
- `/api/demo` - Demo endpoint