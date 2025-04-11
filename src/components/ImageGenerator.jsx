import { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGenerator.css';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const generateImage = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (loading) {
      setError('Please wait for the current image to finish generating');
      return;
    }

    setLoading(true);
    setError(null);
    setIsGenerating(true);
    setGenerationProgress(0);
    
    try {
      // Using Unsplash API to get a random image based on the prompt
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(prompt)}&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`
          }
        }
      );
      
      const newImage = response.data.urls.regular;
      setImages(prevImages => {
        const updatedImages = [...prevImages, newImage];
        setCurrentImageIndex(updatedImages.length - 1);
        return updatedImages;
      });
      setGenerationProgress(100); 
    } catch (err) {
      console.error('Error generating image:', err);
      if (err.response?.status === 403) {
        setError('API key error. Please check your Unsplash API key.');
      } else if (err.response?.status === 429) {
        setError('Rate limit exceeded. Please try again in a few minutes.');
      } else {
        setError(
          err.response?.data?.errors?.[0] || 
          'Failed to generate image. Please try again.'
        );
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsGenerating(false);
        setGenerationProgress(0);
      }, 500);
    }
  };

  // Simulate generation progress
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const handleDownload = async () => {
    if (images.length === 0) return;
    
    try {
      const response = await axios.get(images[currentImageIndex], { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated-image.png');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading image:', err);
      setError('Failed to download image. Please try again.');
    }
  };

  const goToPreviousImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToNextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="image-generator">
      <form onSubmit={generateImage} className="prompt-form">
        <div className="input-group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="prompt-input"
          />
          <button 
            type="submit" 
            className="generate-btn"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      
      <div className="image-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Creating your masterpiece...</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${generationProgress}%` }}
              ></div>
            </div>
            <p className="progress-text">{generationProgress}%</p>
          </div>
        ) : images.length > 0 ? (
          <div className="image-result">
            <img src={images[currentImageIndex]} alt="Generated" />
            <div className="image-navigation">
              <button 
                onClick={goToPreviousImage}
                className="nav-btn prev-btn"
                aria-label="Previous image"
                disabled={images.length <= 1}
              >
                ←
              </button>
              <span className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </span>
              <button 
                onClick={goToNextImage}
                className="nav-btn next-btn"
                aria-label="Next image"
                disabled={images.length <= 1}
              >
                →
              </button>
            </div>
            <button 
              onClick={handleDownload}
              className="download-btn"
            >
              Download Image
            </button>
          </div>
        ) : (
          <div className="placeholder">
            <p>Your generated image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator; 