import React, { useState, useEffect } from 'react';
import { Mic, Copy, Volume2, ArrowLeftRight, Loader2, Bookmark } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { translateText, getTransliteration, playAudio } from '../services/api';

const TranslateScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState(location.state?.initialQuery || "");
  const [kannadaText, setKannadaText] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (location.state?.initialQuery) {
      handleTranslate(location.state.initialQuery);
    }
  }, [location.state]);

  const handleTranslate = async (textToTranslate = inputText) => {
    if (!textToTranslate.trim()) return;
    setIsLoading(true);
    setHasResult(false);

    const knResult = await translateText(textToTranslate); // History is saved inside here now!
    setKannadaText(knResult);
    
    const pronResult = await getTransliteration(knResult);
    setPronunciation(pronResult);

    setIsLoading(false);
    setHasResult(true);
  };

  const saveToBookmarks = () => {
    if (!kannadaText) return;
    
    const savedData = { english: inputText, kannada: kannadaText, pronunciation, date: new Date().toISOString() };
    const existingSaved = JSON.parse(localStorage.getItem('kgpt_saved') || '[]');
    
    // Prevent duplicates
    const isDuplicate = existingSaved.some(item => item.kannada === kannadaText);
    if (!isDuplicate) {
      localStorage.setItem('kgpt_saved', JSON.stringify([savedData, ...existingSaved]));
      alert("Saved successfully!");
    } else {
      alert("Already saved!");
    }
  };

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar">
      <Header showBack={true} />

      <div className="px-5 flex-1">
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm text-brand-dark">
            <ArrowLeftRight size={16} /> Translate
          </button>
          <button onClick={() => navigate('/explainer')} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500">
            AI Explainer
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4 flex items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
            placeholder="Type here..."
            className="flex-1 outline-none text-brand-dark text-sm" 
          />
          <button onClick={() => setInputText("")} className="text-slate-300 px-2">✕</button>
          <Mic className="text-slate-400 ml-2" size={20} />
        </div>

        <button onClick={() => handleTranslate()} disabled={isLoading} className="w-full bg-brand-yellow text-brand-dark font-bold py-3 rounded-xl mb-6 shadow-sm flex items-center justify-center">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Translate'}
        </button>

        {hasResult && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative animate-slide-up mb-6">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">You said</p>
              <p className="text-brand-dark italic text-sm">{inputText}</p>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-bold text-brand-red uppercase tracking-wider mb-2">Kannada Translation</p>
              <h2 className="text-2xl font-bold text-brand-dark leading-tight mb-2">{kannadaText}</h2>
              {pronunciation && (
                <div className="inline-block bg-slate-50 border border-slate-100 px-3 py-1 rounded-md">
                  <p className="text-xs text-slate-600">Pronounced: {pronunciation}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => playAudio(kannadaText)} className="flex-1 bg-brand-dark text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                <Volume2 size={18} /> Listen Audio
              </button>
              <button onClick={() => navigator.clipboard.writeText(kannadaText)} className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-200">
                <Copy size={18} />
              </button>
              <button onClick={saveToBookmarks} className="p-3 bg-slate-50 text-brand-yellow rounded-xl border border-slate-200">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TranslateScreen;