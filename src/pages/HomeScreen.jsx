import React, { useState, useEffect } from 'react';
import { Search, Mic, Languages, Lightbulb, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = 'en-IN';
      recog.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setQuery(text);
        setIsListening(false);
        navigate('/translate', { state: { initialQuery: text } });
      };
      recog.onend = () => setIsListening(false);
      setRecognition(recog);
    }
  }, [navigate]);

  const startListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleGo = () => {
    if (query.trim()) navigate('/translate', { state: { initialQuery: query } });
  };

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar">
      <Header />

      <div className="flex bg-slate-200/50 p-1 mx-5 rounded-xl mb-6">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm text-brand-dark">
          <Languages size={16} /> Translate
        </button>
        <button onClick={() => navigate('/explainer')} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500">
          <Lightbulb size={16} /> AI Explainer
        </button>
      </div>

      <div className="px-5 mb-8">
        <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Good morning" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGo()}
            className="flex-1 bg-transparent outline-none px-3 text-sm text-brand-dark" 
          />
          <button onClick={startListening} className={`p-1 mr-2 ${isListening ? 'text-brand-red animate-pulse' : 'text-slate-400'}`}>
             <Mic size={20} />
          </button>
          <button onClick={handleGo} className="bg-brand-red text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
            Go
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 mb-8">
        <div onClick={() => navigate('/translate')} className="bg-card-yellow p-5 rounded-3xl flex flex-col items-center text-center cursor-pointer">
          <Languages className="text-brand-yellow mb-3" size={28} />
          <h3 className="font-bold text-brand-dark text-sm">Translate</h3>
          <p className="text-[10px] text-slate-500 mt-1">English ↔ Kannada</p>
        </div>
        <div onClick={() => navigate('/explainer')} className="bg-card-blue p-5 rounded-3xl flex flex-col items-center text-center cursor-pointer">
          <Lightbulb className="text-blue-400 mb-3" size={28} />
          <h3 className="font-bold text-brand-dark text-sm">AI Explainer</h3>
          <p className="text-[10px] text-slate-500 mt-1">Places, Topics, More</p>
        </div>
        
        <div onClick={() => navigate('/practice')} className="bg-card-green p-5 rounded-3xl flex flex-col items-center text-center cursor-pointer">
          <Mic className="text-green-500 mb-3" size={28} />
          <h3 className="font-bold text-brand-dark text-sm">Pronunciation</h3>
          <p className="text-[10px] text-slate-500 mt-1">Learn & Practice</p>
        </div>
        
        <div onClick={() => navigate('/practice')} className="bg-card-purple p-5 rounded-3xl flex flex-col items-center text-center cursor-pointer">
          <Volume2 className="text-purple-500 mb-3" size={28} />
          <h3 className="font-bold text-brand-dark text-sm">Audio</h3>
          <p className="text-[10px] text-slate-500 mt-1">Listen Instantly</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-auto pb-10">
        <div onClick={startListening} className="relative flex items-center justify-center w-20 h-20 bg-brand-red rounded-full shadow-lg shadow-red-200 cursor-pointer">
           {isListening && <div className="absolute inset-0 bg-brand-red rounded-full animate-ping opacity-30"></div>}
           <Mic className="text-white relative z-10" size={32} />
        </div>
        <p className="text-sm font-semibold text-brand-dark mt-3">{isListening ? 'Listening...' : 'Tap to speak'}</p>
      </div>
    </div>
  );
};
export default HomeScreen;