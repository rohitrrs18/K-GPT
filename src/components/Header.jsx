import React from 'react';
import { Languages } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-10 shadow-sm px-4 py-4 rounded-b-3xl mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-kannada-yellow p-2 rounded-xl text-kannada-red shadow-sm">
          <Languages size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-kannada-dark tracking-tight">K-GPT</h1>
          <p className="text-xs text-slate-500 font-semibold">Real-time AI Language Assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;