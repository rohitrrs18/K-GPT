import React from 'react';
import Header from '../components/Header';
import { Settings, Trash2 } from 'lucide-react';

const SettingsScreen = () => {
  const clearData = () => {
    localStorage.removeItem('kgpt_history');
    localStorage.removeItem('kgpt_saved');
    alert('Data cleared!');
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-full relative pb-20 overflow-y-auto no-scrollbar bg-brand-gray">
      <Header />
      <div className="px-5">
        <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2"><Settings/> Settings</h2>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
             <p className="font-bold text-brand-dark">Clear App Data</p>
             <p className="text-xs text-slate-500">Removes saved phrases and history</p>
           </div>
           <button onClick={clearData} className="bg-red-50 text-brand-red p-2 rounded-lg"><Trash2 size={18}/></button>
        </div>
      </div>
    </div>
  );
};
export default SettingsScreen;