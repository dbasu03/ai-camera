# AI Camera - iPhone Style Photo Enhancement

A full-stack web application that transforms your photos using AI to look like they were captured by an iPhone. Built with Next.js, React, Tailwind CSS, and open-source AI models.

## Features

- 🎨 **AI-Powered Enhancement**: Transform photos with iPhone-style processing
- 📱 **Modern UI**: Clean, responsive interface with drag-and-drop upload
- 🔄 **Real-time Preview**: Side-by-side comparison of original and enhanced images
- 📥 **Multiple Formats**: Download in PNG, JPG, or JPEG
- ⚡ **Serverless Ready**: Optimized for Vercel deployment
- 🎯 **Open Source**: Uses open-source AI models from Hugging Face

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Sharp (image processing)
- **AI Models**: Hugging Face Inference API, Real-ESRGAN, GFPGAN
- **Deployment**: Vercel (serverless functions)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Hugging Face account (optional, for enhanced AI models)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-camera
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Hugging Face API key (optional):
   ```
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload an Image**: Drag and drop or click to select a photo (PNG, JPG, JPEG)
2. **Process**: Click "Enhance with AI" to transform your image
3. **Preview**: Compare original and enhanced versions side-by-side
4. **Download**: Choose your preferred format and download the enhanced image

## AI Models

The application currently uses Sharp for basic enhancement with iPhone-style processing:

- **Sharpness Enhancement**: Advanced sharpening algorithms
- **Color Balance**: Natural tone mapping and color correction
- **Noise Reduction**: Clean, professional-looking results
- **Resolution Upscaling**: Maintains quality while enhancing details

### Future Enhancements

You can integrate additional AI models:

- **Real-ESRGAN**: Super-resolution and detail enhancement
- **GFPGAN**: Face-specific enhancement and restoration
- **Custom Models**: Train or use specialized iPhone-style models

## API Endpoints

### POST `/api/process-image`

Processes an uploaded image with AI enhancement.

**Request Body:**
```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Response:**
```json
{
  "success": true,
  "processedImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "originalFormat": "jpeg",
  "originalSize": {
    "width": 1920,
    "height": 1080
  }
}
```

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `HUGGINGFACE_API_KEY` (optional)
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Configuration

### Environment Variables

- `HUGGINGFACE_API_KEY`: Your Hugging Face API token (optional)
- `NEXT_PUBLIC_APP_URL`: Your app's URL (for CORS configuration)

### Customization

- **AI Models**: Modify `app/api/process-image/route.ts` to use different models
- **Styling**: Update `tailwind.config.js` and `app/globals.css`
- **Image Processing**: Adjust Sharp parameters in the API route

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for open-source AI models
- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/ai-camera/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using Next.js and AI
