# K-GPT 🇮🇳 | Everyday Kannada AI Assistant

**K-GPT** is a mobile-first, real-time language and knowledge assistant designed to help non-Kannada speakers survive, navigate, and thrive in Karnataka. 

Built for **Track 3: Kannada in Everyday Life**, K-GPT proves that powerful, AI-driven localization tools can be built with **zero budget** and **no API keys**. It leverages open web endpoints and native browser capabilities to deliver a seamless experience without a single line of dummy data.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![No API Keys](https://img.shields.io/badge/API%20Keys-0-brightgreen?style=for-the-badge)

---

## ✨ Core Features

### 1. 🗣️ Real-Time Translation & Transliteration
- Type or speak any English sentence (e.g., *"How much is the auto fare?"*).
- Get instant Kannada translations dynamically fetched from live translation engines.
- Includes **English Transliteration** (Pronunciation guide) so you know exactly how to say it out loud (e.g., *"Auto badige eshtu?"*).

### 2. 🧠 AI Explainer (Knowledge Base)
- Search for any place, topic, or concept (e.g., *"Lalbagh"*, *"Bangalore Metro"*).
- K-GPT generates a localized summary directly in Kannada.
- Bypasses English-to-Kannada translation by directly fetching regional data, ensuring high accuracy and natural phrasing.

### 3. 🔊 Native Text-to-Speech (TTS)
- Listen to the Kannada translation or the AI summary with a single tap.
- Uses the browser's **native Web Speech API** (100% free, zero latency).
- Includes smart fallbacks (Hindi/Indian English) if your device lacks a native Kannada voice pack.
- Shows a helpful warning if the device is missing the Kannada language pack.

### 4. 🎙️ Voice Search (STT)
- Tap the microphone icon to speak your query in English.
- Uses the browser's native Speech Recognition API for hands-free operation.

### 5. 📋 One-Tap Copy
- Copy the Kannada script and pronunciation guide to your clipboard instantly.

---

## 🛠️ Tech Stack & Architecture (No Paid APIs!)

K-GPT is built entirely on free, open, and native technologies:
- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons.
- **Translation Engine:** MyMemory API (Free, No Key).
- **Transliteration Engine:** Google Input Tools (Free community endpoint).
- **Knowledge Engine:** MediaWiki API (Directly queries `kn.wikipedia.org` for Kannada data, bypassing the need for English translation).
- **Audio Engine:** Browser-native `window.speechSynthesis` (TTS) and `window.webkitSpeechRecognition` (STT).

---

## 📁 Project Structure

```text
k-gpt/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── services/
    │   └── api.js                 # Free API integrations (Translation, Wiki, Transliteration)
    └── components/
        ├── Header.jsx
        ├── TranslatorInput.jsx    # Search bar, Mode toggle, Voice STT
        ├── ResultCard.jsx         # Translation display & TTS
        └── KnowledgeResultCard.jsx# AI Explainer display & TTS

        
## 🚀 Quick Start

1. **Clone the repository:**
   Open your terminal and run:
   `git clone https://github.com/your-username/k-gpt.git`
   Then navigate into the folder:
   `cd k-gpt`

2. **Install dependencies:**
   Run this command to install all required packages:
   `npm install`

3. **Start the development server:**
   Launch the local server:
   `npm run dev`

4. **Open in Browser:**
   Navigate to `http://localhost:5173`. 

*(Note: For the best voice experience, use Google Chrome or Microsoft Edge on a mobile device or desktop with Kannada language packs installed).*