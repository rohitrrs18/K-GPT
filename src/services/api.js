// 1. Live Translation API (Saves to history automatically, even if user navigates away)
export const translateText = async (text, targetLang = 'kn') => {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      const translatedText = data.responseData.translatedText;
      
      // Force save to History here
      const historyData = { 
        english: text, 
        kannada: translatedText, 
        date: new Date().toISOString() 
      };
      const existingHistory = JSON.parse(localStorage.getItem('kgpt_history') || '[]');
      
      const isDuplicate = existingHistory.some(item => item.english === text);
      if (!isDuplicate) {
        localStorage.setItem('kgpt_history', JSON.stringify([historyData, ...existingHistory].slice(0, 50)));
      }

      return translatedText;
    }
    throw new Error("Translation failed");
  } catch (error) {
    return "ಕ್ಷಮಿಸಿ, ಈ ಸಮಯದಲ್ಲಿ ಅನುವಾದ ಸಾಧ್ಯವಿಲ್ಲ. (Sorry, unable to translate.)";
  }
};

// 2. Live Transliteration
export const getTransliteration = async (kannadaText) => {
  try {
    const response = await fetch(`https://inputtools.google.com/request?text=${encodeURIComponent(kannadaText)}&itc=kn-t-i0-und&num=1`);
    const data = await response.json();
    if (data[0] === 'SUCCESS' && data[1] && data[1][0][1]) return data[1][0][1][0];
    return "";
  } catch (error) {
    return "";
  }
};

// 3. Live Wikipedia (Kannada) with Images
export const getKnowledgeSummary = async (query) => {
  try {
    const searchRes = await fetch(`https://kn.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`);
    const searchData = await searchRes.json();
    if (!searchData.query?.search?.length) return null;

    const pageTitle = searchData.query.search[0].title;

    const extractRes = await fetch(`https://kn.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=400&titles=${encodeURIComponent(pageTitle)}&format=json&origin=*`);
    const extractData = await extractRes.json();
    
    const pages = extractData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1' || !pages[pageId].extract) return null;

    return {
      title: pageTitle,
      extract: pages[pageId].extract,
      imageUrl: pages[pageId].thumbnail?.source || null 
    };
  } catch (error) {
    return null;
  }
};

// 4. Native Text-to-Speech
export const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.includes('kn')) || voices.find(v => v.lang.includes('hi-IN')) || voices.find(v => v.lang.includes('en-IN'));
    if (targetVoice) utterance.voice = targetVoice;
    window.speechSynthesis.speak(utterance);
  }
};