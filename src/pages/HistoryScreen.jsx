import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const location = useLocation(); // Triggers re-render on route change

  // Use useEffect with location dependency to force re-read when page is visited
  useEffect(() => {
    const loadHistory = () => {
      const data = JSON.parse(localStorage.getItem('kgpt_history') || '[]');
      setHistory(data);
    };
    
    loadHistory();
  }, [location]);

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar bg-brand-gray">
      <Header />
      <div className="px-5">
        <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2"><Clock/> History</h2>
        
        {history.length === 0 ? (
          <div className="text-center mt-10 text-slate-400">
            <Clock size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">No history yet. Start translating!</p>
          </div>
        ) : (
          history.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-slate-100">
               <p className="text-xs text-slate-500 italic">"{item.english}"</p>
               <p className="text-lg font-bold text-brand-dark mt-1">{item.kannada}</p>
               <p className="text-[10px] text-slate-400 mt-2">{new Date(item.date).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default HistoryScreen;