import { useState } from 'react';
import './App.css';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>AI Image Generator</h1>
          <p>Transform your imagination into stunning visuals</p>
        </header>
        <main>
          <ImageGenerator />
        </main>
        <footer className="footer">
          <p>Made by <a href="https://www.linkedin.com/in/masumali26" target="_blank" rel="noopener noreferrer">Masum</a> :)</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 