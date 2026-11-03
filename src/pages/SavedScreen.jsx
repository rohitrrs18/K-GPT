import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Bookmark } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SavedScreen = () => {
  const [saved, setSaved] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('kgpt_saved') || '[]');
    setSaved(data);
  }, [location]);

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar bg-brand-gray">
      <Header />
      <div className="px-5">
        <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2"><Bookmark/> Saved</h2>
        
        {saved.length === 0 ? (
          <div className="text-center mt-10 text-slate-400">
            <Bookmark size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">No saved phrases yet.</p>
          </div>
        ) : (
          saved.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-slate-100">
               <p className="text-xs text-slate-500 italic">"{item.english}"</p>
               <p className="text-lg font-bold text-brand-dark mt-1">{item.kannada}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default SavedScreen;