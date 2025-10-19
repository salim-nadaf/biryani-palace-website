import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical resources for better performance
import heroImage from '@/assets/hero-biryani-optimized.webp';
import heroImageFallback from '@/assets/Mutton Biryani hero image.jpg';

// Preload hero image for faster LCP - prefer WebP
const linkWebP = document.createElement('link');
linkWebP.rel = 'preload';
linkWebP.as = 'image';
linkWebP.type = 'image/webp';
linkWebP.href = heroImage;
document.head.appendChild(linkWebP);

// Fallback for browsers without WebP support
const linkFallback = document.createElement('link');
linkFallback.rel = 'preload';
linkFallback.as = 'image';
linkFallback.href = heroImageFallback;
document.head.appendChild(linkFallback);

createRoot(document.getElementById("root")!).render(<App />);
