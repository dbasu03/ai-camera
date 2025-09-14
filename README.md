# AI Camera - iPhone Style Photo Enhancement

A full-stack web application that transforms your photos using AI to look like they were captured by an iPhone. Built with Next.js, React, Tailwind CSS, and advanced image processing.

## Features

- 🎨 **AI-Powered Enhancement**: Transform photos with iPhone-style processing
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- 🔄 **Real-time Preview**: Side-by-side comparison of original and enhanced images
- 📥 **Multiple Formats**: Download in PNG, JPG, or JPEG
- ⚡ **Serverless Ready**: Optimized for Vercel deployment
- 🎯 **No External APIs**: Self-contained image processing

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Sharp (image processing)
- **Image Processing**: Advanced Sharp algorithms for iPhone-style enhancement
- **Deployment**: Vercel (serverless functions)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. **Set up environment variables (optional)**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` if you need any custom configuration:
   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000
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

## AI Enhancement Features

The application uses advanced Sharp image processing algorithms to provide iPhone-style enhancement:

- **Enhanced Sharpness**: Advanced sharpening algorithms for crystal-clear details
- **Color Balance**: Natural tone mapping and color correction
- **Noise Reduction**: Clean, professional-looking results
- **Resolution Optimization**: Maintains quality while enhancing details
- **iPhone Color Science**: Balanced colors and natural tone mapping

## Responsive Design

The application is fully responsive and optimized for all devices:

- **Mobile**: Touch-friendly interface with optimized spacing
- **Tablet**: Balanced layout with appropriate sizing
- **Desktop**: Full-featured experience with side-by-side previews

### Mobile Features

- Touch-optimized drag and drop
- Responsive image previews
- Mobile-friendly download options
- Optimized button sizes and spacing

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
  },
  "enhancedSize": 1234567
}
```

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Deploy** - Vercel will automatically build and deploy
3. **No environment variables needed** - the app works out of the box

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Configuration

### Environment Variables

- `NEXT_PUBLIC_APP_URL`: Your app's URL (optional, for CORS configuration)

### Customization

- **Image Processing**: Adjust Sharp parameters in `lib/imageUtils.ts`
- **Styling**: Update `tailwind.config.js` and `app/globals.css`
- **Enhancement Settings**: Modify enhancement options in the API route

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Set up development environment

### Project Structure

```
ai-camera/
├── app/
│   ├── api/process-image/route.ts    # Image processing API
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # App layout
│   └── page.tsx                      # Main page
├── components/
│   ├── ImageUpload.tsx               # Drag-and-drop upload
│   ├── ImagePreview.tsx              # Image preview
│   └── DownloadButton.tsx            # Download options
├── lib/
│   └── imageUtils.ts                 # Image processing utilities
└── scripts/
    └── setup.js                      # Development setup
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) for powerful image processing
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Lucide React](https://lucide.dev/) for beautiful icons

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/ai-camera/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using Next.js and advanced image processing