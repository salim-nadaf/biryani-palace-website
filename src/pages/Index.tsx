import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LoginSection from '@/components/LoginSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import WelcomeSection from '@/components/WelcomeSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        
        {/* Menu Preview Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto text-center">
            <h2 className="font-alata text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="font-allura text-primary text-4xl md:text-5xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Royal Menu</span>
            </h2>
            <p className="font-montserrat text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover our carefully crafted biryani varieties, each made with authentic spices 
              and premium ingredients that have been perfected over generations.
            </p>
            <Link to="/menu">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold glow-gold" size="lg">
                Explore Full Menu
              </Button>
            </Link>
          </div>
        </section>
        
        <LoginSection />
const location = useLocation();

useEffect(() => {
  if (location.state?.showLogin) {
    const loginSection = document.getElementById('login');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [location]);
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
