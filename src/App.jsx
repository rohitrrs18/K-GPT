import React, { useState } from 'react';
import Header from './components/Header';
import TranslatorInput from './components/TranslatorInput';
import ResultCard from './components/ResultCard';
import KnowledgeResultCard from './components/KnowledgeResultCard';
import { translateText, getTransliteration, getKnowledgeSummary } from './services/api';
import { AlertCircle, MessageSquareText } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState(null); // 'translate' or 'knowledge'

  const handleAction = async (text, mode) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setResultType(null);

    try {
      if (mode === 'knowledge') {
        // AI Explainer Mode
        const knowledgeData = await getKnowledgeSummary(text);
        if (!knowledgeData) {
          throw new Error("Could not find a summary for this topic. Try another search.");
        }
        setResult(knowledgeData);
        setResultType('knowledge');
      } else {
        // Translation Mode
        const kannadaTranslation = await translateText(text);
        if (!kannadaTranslation) {
          throw new Error("Translation failed. Please try a different sentence.");
        }
        const pronunciation = await getTransliteration(kannadaTranslation);
        setResult({
          english: text,
          kannada: kannadaTranslation,
          pronunciation: pronunciation || "Audio available"
        });
        setResultType('translate');
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <TranslatorInput onAction={handleAction} isLoading={isLoading} />

        {error && (
          <div className="mx-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-slide-up">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {result ? (
          resultType === 'knowledge' ? (
            <KnowledgeResultCard data={result} />
          ) : (
            <ResultCard {...result} />
          )
        ) : (
          !isLoading && !error && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 px-8 text-center animate-slide-up">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <MessageSquareText size={40} className="text-slate-300" />
              </div>
              <p className="font-bold text-lg text-slate-600 mb-2">Ready to assist</p>
              <p className="text-sm">Switch modes to translate everyday sentences or use the AI Explainer to get instant summaries on any topic in Kannada.</p>
            </div>
          )
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pointer-events-none">
         <div className="bg-kannada-dark/5 border border-kannada-dark/10 text-kannada-dark text-center py-3 rounded-xl text-xs font-bold tracking-wide backdrop-blur-sm">
            Track 3: Kannada in Everyday Life
         </div>
      </div>
    </div>
  );
}

export default App;