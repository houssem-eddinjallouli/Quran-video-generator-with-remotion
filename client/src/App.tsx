import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import VideoList from './VideoList';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />

        <h1 style={{ marginTop: '10px' }}>🎥 Quran Video Generator</h1>
        
        <div className="link-bar">
          <a
            className="App-link"
            href="https://github.com/houssem-eddinjallouli/Quran-video-generator-with-remotion"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 GitHub Repo
          </a>
          <a
            className="App-link"
            href="https://www.youtube.com/@houssemjallouli6083"
            target="_blank"
            rel="noopener noreferrer"
          >
            📺 YouTube Channel
          </a>
        </div>
      </header>

      <main className="App-main">
        <Form onComplete={() => setRefresh(!refresh)} />
        <hr style={{ width: '80%', margin: '40px auto' }} />
        <VideoList key={refresh ? 1 : 0} />
      </main>
    </div>
  );
}

export default App;
