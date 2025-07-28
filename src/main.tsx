import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical resources for better performance
import heroImage from '@/assets/hero-biryani.jpg';

// Preload hero image for faster LCP
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'image';
link.href = heroImage;
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
