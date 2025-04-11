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
        <footer className="app-footer">
          <p>© 2024 AI Image Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App; 