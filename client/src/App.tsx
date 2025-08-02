import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import VideoList from './VideoList';

// Define the type for language
type Language = 'en' | 'ar';

// Translation dictionary with type safety
const translations = {
  en: {
    title: "🎥 Quran Video Generator",
    github: "🔗 GitHub Repo",
    youtube: "📺 YouTube Channel",
    loading: "Loading..."
  },
  ar: {
    title: "🎥 مولد فيديو القرآن الكريم",
    github: "🔗 مستودع جيت هاب",
    youtube: "📺 قناة اليوتيوب",
    loading: "جاري التحميل..."
  }
};

function App() {
  const [refresh, setRefresh] = useState(false);
  const [language, setLanguage] = useState<Language>('en'); // Explicitly typed
  
  // This is now type-safe - TypeScript knows language can only be 'en' or 'ar'
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="App" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ marginTop: '10px' }}>{t.title}</h1>
          <button 
            onClick={toggleLanguage}
            style={{
              padding: '5px 10px',
              background: '#61dafb',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
        
        <div className="link-bar">
          <a
            className="App-link"
            href="https://github.com/houssem-eddinjallouli/Quran-video-generator-with-remotion"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.github}
          </a>
          <a
            className="App-link"
            href="https://www.youtube.com/@houssemjallouli6083"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.youtube}
          </a>
        </div>
      </header>

      <main className="App-main">
        <Form onComplete={() => setRefresh(!refresh)} language={language} />
        <hr style={{ width: '80%', margin: '40px auto' }} />
        <VideoList key={refresh ? 1 : 0} language={language} />
      </main>
    </div>
  );
}

export default App;
