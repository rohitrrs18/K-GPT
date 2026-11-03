import React from 'react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between py-4 px-5 bg-brand-gray z-10">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-slate-500 font-bold text-2xl mr-1">
            ‹
          </button>
        )}
        <div className="bg-brand-yellow p-2 rounded-xl text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4v16" />
            <path d="M20 4L8 12l12 8" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-brand-dark leading-tight">K-GPT</h1>
          <p className="text-[10px] text-slate-400 font-medium">Real-time AI Language Assistant</p>
        </div>
      </div>
      {!showBack && <Settings className="text-slate-400" size={20} />}
    </header>
  );
};
export default Header;