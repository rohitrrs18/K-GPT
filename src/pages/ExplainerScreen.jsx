import React, { useState, useEffect } from 'react';
import { Search, Mic, Volume2, Lightbulb, Loader2, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getKnowledgeSummary, playAudio } from '../services/api';

const ExplainerScreen = () => {
  const navigate = useNavigate();
  // Initialize state from localStorage so it doesn't vanish on tab switch
  const [query, setQuery] = useState(localStorage.getItem('kgpt_last_query') || '');
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('kgpt_explainer_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setData(null);
    localStorage.removeItem('kgpt_explainer_data'); // Clear old data while loading

    const result = await getKnowledgeSummary(query);
    if (result) {
      setData(result);
      // Save to localStorage immediately to prevent vanishing
      localStorage.setItem('kgpt_explainer_data', JSON.stringify(result));
      localStorage.setItem('kgpt_last_query', query);
    } else {
      setError("No information found for this topic.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar">
      <Header showBack={true} />

      <div className="px-5 flex-1">
        <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
          <button onClick={() => navigate('/translate')} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500">
             Translate
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm text-brand-dark">
            <Lightbulb size={16} /> AI Explainer
          </button>
        </div>

        <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-6">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Search Mysore Palace..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent outline-none px-3 text-sm text-brand-dark" 
          />
          <button onClick={handleSearch} disabled={isLoading} className="bg-brand-red text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center min-w-[60px]">
             {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Go'}
          </button>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl text-center mb-4">{error}</div>}

        {data && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-slide-up mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4 items-center">
                {data.imageUrl ? (
                  <img src={data.imageUrl} alt={data.title} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-brand-yellow">
                    <Lightbulb size={28} />
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-brand-dark text-lg leading-tight">{data.title}</h2>
                  <p className="text-[10px] text-slate-400 mt-1">Knowledge Base</p>
                </div>
              </div>
              <button onClick={() => playAudio(data.extract)} className="text-slate-400 bg-slate-50 p-2 rounded-full hover:bg-slate-200">
                <Volume2 size={16} />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">
              {data.extract}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExplainerScreen;