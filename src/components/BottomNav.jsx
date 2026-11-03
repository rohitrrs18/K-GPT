import React from 'react';
import { Home, Clock, Bookmark, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/history', icon: <Clock size={20} />, label: 'History' },
    { path: '/saved', icon: <Bookmark size={20} />, label: 'Saved' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-3 pb-6 z-20">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-brand-yellow' : 'text-slate-400'
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};
export default BottomNav;