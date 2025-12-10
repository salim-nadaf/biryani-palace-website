import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload hero images for faster LCP - detect current page
const isMenuPage = window.location.pathname === '/menu';
const heroLink = document.createElement('link');
heroLink.rel = 'preload';
heroLink.as = 'image';
heroLink.type = 'image/webp';
heroLink.fetchPriority = 'high';
// Use the smaller optimized images
heroLink.href = isMenuPage ? '/src/assets/hero-biryani-small.webp' : '/src/assets/hero-biryani-optimized.webp';
document.head.appendChild(heroLink);

createRoot(document.getElementById("root")!).render(<App />);
