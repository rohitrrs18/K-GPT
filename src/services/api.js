// 1. Free Translation API (No Key Required)
export const translateText = async (text, targetLang = 'kn') => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    throw new Error("Translation failed. Try a different sentence.");
  } catch (error) {
    console.error("Translation Error:", error);
    return null;
  }
};

// 2. Free Transliteration API (Converts Kannada script to English letters for pronunciation)
export const getTransliteration = async (kannadaText) => {
  try {
    const response = await fetch(
      `https://inputtools.google.com/request?text=${encodeURIComponent(kannadaText)}&itc=kn-t-i0-und&num=1`
    );
    const data = await response.json();
    
    if (data[0] === 'SUCCESS' && data[1] && data[1][0][1] && data[1][0][1][0]) {
      return data[1][0][1][0];
    }
    return null;
  } catch (error) {
    console.error("Transliteration Error:", error);
    return null;
  }
};

// 3. Free Knowledge API (Secretly fetches from Kannada Wikipedia, but presented as AI)
export const getKnowledgeSummary = async (query) => {
  try {
    // Step 1: Search for the page title
    const searchUrl = `https://kn.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.query || !searchData.query.search || searchData.query.search.length === 0) {
      return null; 
    }

    const pageTitle = searchData.query.search[0].title;

    // Step 2: Fetch the summary/extract for that page
    const extractUrl = `https://kn.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(pageTitle)}&format=json&origin=*`;
    const extractRes = await fetch(extractUrl);
    const extractData = await extractRes.json();

    const pages = extractData.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId === '-1' || !pages[pageId].extract) {
      return null;
    }

    return {
      title: pageTitle,
      extract: pages[pageId].extract,
      url: `https://kn.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`
    };
  } catch (error) {
    console.error("Knowledge Base Error:", error);
    return null;
  }
};