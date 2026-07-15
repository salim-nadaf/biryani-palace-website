import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Biryani Palace - Best Biryani in Kalyan | Free Delivery</title>
        <meta name="description" content="Authentic Hyderabadi biryani in Kalyan. Order chicken, mutton & veg biryani with free delivery. Bulk plans for parties & weddings." />
        <link rel="canonical" href="https://biryanipalace.lovable.app/" />
        <meta property="og:title" content="Biryani Palace - Best Biryani in Kalyan" />
        <meta property="og:description" content="Authentic Hyderabadi biryani in Kalyan with free delivery and bulk event plans." />
        <meta property="og:url" content="https://biryanipalace.lovable.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
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
