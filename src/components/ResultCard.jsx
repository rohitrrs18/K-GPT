import React, { useState, useEffect } from 'react';
import { Volume2, Copy, Check, AlertCircle } from 'lucide-react';

const ResultCard = ({ english, kannada, pronunciation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      if (window.speechSynthesis && window.speechSynthesis.getVoices().length > 0) {
        setVoicesLoaded(true);
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakKannada = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(kannada);
    utterance.rate = 0.85; 

    const voices = window.speechSynthesis.getVoices();
    
    // 1. Try native Kannada, 2. Fallback to Hindi, 3. Fallback to Indian English
    let targetVoice = voices.find(v => v.lang.includes('kn')) || 
                      voices.find(v => v.lang.includes('hi-IN')) || 
                      voices.find(v => v.lang.includes('en-IN'));

    if (targetVoice) {
      utterance.voice = targetVoice;
      utterance.lang = targetVoice.lang;
    } else {
      utterance.lang = 'kn-IN'; 
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${kannada}\n(${pronunciation})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-4 animate-slide-up">
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-kannada-yellow/10 rounded-full blur-2xl"></div>
        
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">You said</p>
          <p className="text-lg text-slate-700 italic">"{english}"</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold text-kannada-red uppercase tracking-wider mb-1">Kannada Translation</p>
          <h2 className="text-3xl font-bold text-kannada-dark leading-tight mb-3">
            {kannada}
          </h2>
          {pronunciation && (
            <div className="inline-block bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-600">
                <span className="text-slate-400 mr-2">Pronounced:</span>
                {pronunciation}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={speakKannada}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
              isPlaying 
                ? 'bg-kannada-red text-white animate-pulse' 
                : 'bg-kannada-dark text-white hover:bg-slate-800'
            }`}
          >
            <Volume2 size={20} />
            {isPlaying ? 'Speaking...' : 'Listen Audio'}
          </button>
          
          <button 
            onClick={copyToClipboard}
            className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            title="Copy translation"
          >
            {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
          </button>
        </div>

        {voicesLoaded && !window.speechSynthesis.getVoices().some(v => v.lang.includes('kn')) && (
          <div className="mt-4 flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <p>Your device lacks a native Kannada voice pack. Using an Indian English/Hindi fallback voice. (Install Kannada in device settings for perfect audio).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;