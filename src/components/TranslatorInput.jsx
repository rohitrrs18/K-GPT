import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, Loader2, Lightbulb, Languages } from 'lucide-react';

const TranslatorInput = ({ onAction, isLoading }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('translate'); // 'translate' or 'knowledge'
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-IN'; 

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onAction(transcript, mode);
        setIsListening(false);
      };

      recog.onend = () => setIsListening(false);
      recog.onerror = () => setIsListening(false);

      setRecognition(recog);
    }
  }, [onAction, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onAction(query, mode);
    }
  };

  const toggleListen = () => {
    if (!recognition) return alert("Voice input is not supported in your browser.");
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="px-4 mb-4">
      {/* Mode Toggle */}
      <div className="flex bg-slate-200 p-1 rounded-xl mb-4 w-full">
        <button
          onClick={() => setMode('translate')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            mode === 'translate' ? 'bg-white text-kannada-dark shadow-sm' : 'text-slate-500'
          }`}
        >
          <Languages size={16} /> Translate
        </button>
        <button
          onClick={() => setMode('knowledge')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
            mode === 'knowledge' ? 'bg-white text-kannada-dark shadow-sm' : 'text-slate-500'
          }`}
        >
          <Lightbulb size={16} /> AI Explainer
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden focus-within:border-kannada-red focus-within:ring-2 focus-within:ring-kannada-red/20 transition-all">
        <div className="pl-4 text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder={mode === 'translate' ? "Type English sentence..." : "Search any topic or place..."}
          className="w-full py-4 px-3 outline-none text-slate-700 bg-transparent text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={toggleListen}
          className={`p-2 m-1 rounded-xl transition-colors ${
            isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-400 hover:text-kannada-red'
          }`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="bg-kannada-red text-white p-3 m-1 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center min-w-[60px] shadow-sm"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Go'}
        </button>
      </form>
    </div>
  );
};

export default TranslatorInput;