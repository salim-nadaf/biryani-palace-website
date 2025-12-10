import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload only the optimized WebP hero image for faster LCP
const heroLink = document.createElement('link');
heroLink.rel = 'preload';
heroLink.as = 'image';
heroLink.type = 'image/webp';
heroLink.href = '/assets/images/hero-biryani-optimized.webp';
document.head.appendChild(heroLink);

createRoot(document.getElementById("root")!).render(<App />);
