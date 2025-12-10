import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Minimal startup - defer non-critical work
const root = document.getElementById("root")!;

createRoot(root).render(<App />);
