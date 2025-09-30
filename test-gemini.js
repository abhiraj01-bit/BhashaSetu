#!/usr/bin/env node

/**
 * Test script to verify Gemini API integration
 */

import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp';

async function testGeminiAPI() {
  console.log('🔍 Testing Gemini API Integration...\n');

  // Check if API key is configured
  if (!GEMINI_API_KEY) {
    console.log('❌ GEMINI_API_KEY not found in environment variables');
    console.log('💡 To test Gemini API:');
    console.log('   1. Get API key from: https://aistudio.google.com/app/apikey');
    console.log('   2. Add to .env file: GEMINI_API_KEY=your_api_key_here');
    console.log('   3. Run this test again\n');
    return false;
  }

  console.log('✅ GEMINI_API_KEY found');
  console.log(`📋 Using model: ${GEMINI_MODEL}\n`);

  // Test API call
  try {
    const testText = 'नमस्ते'; // "Hello" in Nepali
    const prompt = 'Translate the following Nepali text into natural English. Preserve line breaks.';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    console.log('🚀 Testing translation...');
    console.log(`📝 Input: "${testText}" (Nepali)`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${prompt}\n\nTEXT:\n${testText}` }] }
        ],
        generationConfig: { temperature: 0.2 }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ API call failed: ${response.status}`);
      console.log(`📄 Error details: ${errorText}`);
      return false;
    }

    const data = await response.json();
    const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    
    if (translatedText) {
      console.log(`✅ Translation successful!`);
      console.log(`📤 Output: "${translatedText.trim()}"`);
      console.log(`🔧 Provider: gemini`);
      return true;
    } else {
      console.log('❌ No translation text in response');
      console.log('📄 Response:', JSON.stringify(data, null, 2));
      return false;
    }

  } catch (error) {
    console.log('❌ Error during API test:', error.message);
    return false;
  }
}

async function testTranslateEndpoint() {
  console.log('\n🔍 Testing /api/translate endpoint...\n');
  
  try {
    const response = await fetch('http://localhost:8080/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'नमस्ते',
        source: 'ne',
        target: 'en'
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Endpoint test successful!');
      console.log('📤 Result:', result);
    } else {
      console.log('❌ Endpoint test failed:', response.status);
      console.log('💡 Make sure server is running: npm run dev');
    }
  } catch (error) {
    console.log('❌ Endpoint not reachable:', error.message);
    console.log('💡 Make sure server is running: npm run dev');
  }
}

// Run tests
testGeminiAPI().then(success => {
  if (success) {
    testTranslateEndpoint();
  }
});