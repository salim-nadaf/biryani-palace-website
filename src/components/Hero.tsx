import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-background.png';

const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Authentic Biryani"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Star Rating */}
          <div className="flex justify-center items-center space-x-1 mb-6">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-6 h-6 fill-primary text-primary" />
            ))}
            <Star className="w-6 h-6 text-primary" />
            <span className="ml-3 font-montserrat text-foreground/90">
              Loved by 100+ families
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-alata text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Best Biryani in Kalyan
          </h1>

          {/* Subtitle */}
          <p className="font-montserrat text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the royal taste of traditional biryani, crafted with love and 
            served fresh for your family's special moments.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-foreground/80 font-montserrat">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Fresh Ingredients</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Traditional Recipe</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Family Portions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToMenu}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold px-8 py-6 text-lg glow-gold transition-smooth"
            >
              View Our Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 font-montserrat font-semibold px-8 py-6 text-lg"
              onClick={() => window.open('https://wa.me/919167682582', '_blank')}
            >
              Order Now via WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;