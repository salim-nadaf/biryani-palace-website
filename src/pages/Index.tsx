import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LoginSection from '@/components/LoginSection';
import About from '@/components/About';
import Contact from '@/components/Contact';
import WelcomeSection from '@/components/WelcomeSection';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showLogin) {
      // Delay to allow DOM to fully render
      setTimeout(() => {
        const loginSection = document.getElementById('login');
        if (loginSection) {
          loginSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // 100ms is usually enough
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WelcomeSection />
        
        {/* Menu Highlights Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-alata text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="font-allura text-primary text-4xl md:text-5xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Royal Menu</span>
              </h2>
              <p className="font-montserrat text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Discover our carefully crafted biryani varieties, each made with authentic spices 
                and premium ingredients that have been perfected over generations.
              </p>
            </div>
            
            {/* Menu Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6 text-center border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍛</span>
                </div>
                <h3 className="font-alata text-xl font-semibold text-foreground mb-2">Premium Biryanis</h3>
                <p className="font-montserrat text-foreground/70 text-sm">Authentic recipes passed down through generations</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥘</span>
                </div>
                <h3 className="font-alata text-xl font-semibold text-foreground mb-2">Bucket Specials</h3>
                <p className="font-montserrat text-foreground/70 text-sm">Perfect for sharing with family and friends</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 text-center border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌶️</span>
                </div>
                <h3 className="font-alata text-xl font-semibold text-foreground mb-2">Spice Masters</h3>
                <p className="font-montserrat text-foreground/70 text-sm">Expertly blended aromatic spices in every dish</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/menu">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold glow-gold" size="lg">
                  Explore Full Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <LoginSection />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
