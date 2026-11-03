import React from 'react';
import { Play } from 'lucide-react';
import Header from '../components/Header';
import { playAudio } from '../services/api';

const PracticeScreen = () => {
  const phrases = [
    { en: "Hello", kn: "ನಮಸ್ಕಾರ", pron: "Namaskara" },
    { en: "Thank you", kn: "ಧನ್ಯವಾದ", pron: "Dhanyavada" },
    { en: "How much is this?", kn: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?", pron: "Idara bele eshtu?" },
    { en: "Where is the bus?", kn: "ಬಸ್ ಎಲ್ಲಿದೆ?", pron: "Bus ellide?" }
  ];

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar bg-brand-gray">
      <Header showBack={true} />
      <div className="px-5">
        <h2 className="text-xl font-bold text-brand-dark mb-4">Listen & Practice</h2>
        {phrases.map((p, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{p.en}</p>
              <p className="text-xl font-bold text-brand-dark mt-1">{p.kn}</p>
              <p className="text-xs text-brand-yellow font-medium mt-1">{p.pron}</p>
            </div>
            <button onClick={() => playAudio(p.kn)} className="bg-slate-50 p-3 rounded-full text-brand-dark hover:bg-brand-yellow hover:text-white transition-colors">
               <Play size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PracticeScreen;