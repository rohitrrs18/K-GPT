import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import TranslateScreen from './pages/TranslateScreen';
import ExplainerScreen from './pages/ExplainerScreen';
import PracticeScreen from './pages/PracticeScreen';
import HistoryScreen from './pages/HistoryScreen';
import SavedScreen from './pages/SavedScreen';
import SettingsScreen from './pages/SettingsScreen';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 flex justify-center font-sans">
        <div className="w-full max-w-md bg-brand-gray h-screen relative shadow-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto pb-20">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/translate" element={<TranslateScreen />} />
              <Route path="/explainer" element={<ExplainerScreen />} />
              <Route path="/practice" element={<PracticeScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/saved" element={<SavedScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}
export default App;