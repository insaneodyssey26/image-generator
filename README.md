# AI Image Generator

A modern React application that generates images based on text prompts using the Unsplash API.

## Features

- Clean, modern UI with responsive design
- Text-to-image generation using Unsplash API
- Loading states and error handling
- Image download functionality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Unsplash API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/image-generator.git
   cd image-generator
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Unsplash API key:

   ```
   VITE_UNSPLASH_API_KEY=your_unsplash_api_key_here
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## How to Get an Unsplash API Key

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Sign up for a free account
3. Create a new application
4. Copy your API key (Client ID)
5. Paste it in your `.env` file

## Usage

1. Enter a descriptive prompt in the input field
2. Click the "Generate" button
3. Wait for the image to be generated
4. Download the generated image using the "Download Image" button

## Technologies Used

- React
- Vite
- Unsplash API
- CSS3

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Unsplash for providing the API
- React and Vite teams for the amazing frameworks
