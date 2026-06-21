import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Lazy load below-fold components
const WelcomeSection = lazy(() => import('@/components/WelcomeSection'));
const LoginSection = lazy(() => import('@/components/LoginSection'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const MenuHighlights = lazy(() => import('@/components/MenuHighlights'));
const CalculatorPromo = lazy(() => import('@/components/CalculatorPromo'));

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showLogin) {
      setTimeout(() => {
        const loginSection = document.getElementById('login');
        if (loginSection) {
          loginSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <WelcomeSection />
          <MenuHighlights />
          <CalculatorPromo />
          <LoginSection />
          <About />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
