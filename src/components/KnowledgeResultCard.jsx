import React, { useState } from 'react';
import { Volume2, Lightbulb } from 'lucide-react';

const KnowledgeResultCard = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakKannada = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(data.extract);
      utterance.rate = 0.9; 
      
      const voices = window.speechSynthesis.getVoices();
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
    } else {
      alert("Text-to-speech is not supported.");
    }
  };

  return (
    <div className="px-4 animate-slide-up">
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 relative overflow-hidden">
        {/* Knowledge Assistant decorative element */}
        <div className="absolute -top-4 -right-4 text-amber-50">
          <Lightbulb size={80} />
        </div>
        
        <div className="mb-4 relative z-10">
          <p className="text-xs font-bold text-kannada-red uppercase tracking-wider mb-1">AI Knowledge Assistant</p>
          <h2 className="text-2xl font-bold text-kannada-dark leading-tight mb-2">
            {data.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-h-60 overflow-y-auto pr-2">
            {data.extract}
          </p>
        </div>
        
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 relative z-10">
          <button
            onClick={speakKannada}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
              isPlaying 
                ? 'bg-kannada-red text-white animate-pulse' 
                : 'bg-kannada-dark text-white hover:bg-slate-800'
            }`}
          >
            <Volume2 size={20} />
            {isPlaying ? 'Reading...' : 'Listen to Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeResultCard;