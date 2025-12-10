import { memo } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImageOptimized from '@/assets/hero-biryani-optimized.webp';
import heroImageSmall from '@/assets/hero-biryani-small.webp';
import heroImage720 from '@/assets/hero-biryani-720.webp';

const Hero = memo(() => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImageSmall}
          srcSet={`${heroImageSmall} 480w, ${heroImage720} 720w, ${heroImageOptimized} 1920w`}
          sizes="100vw"
          alt="Delicious authentic mutton biryani served in traditional style"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Star Rating */}
          <div className="flex justify-center items-center space-x-1 mb-6" role="img" aria-label="4.5 star rating">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} className="w-6 h-6 fill-primary text-primary" aria-hidden="true" />
            ))}
            <Star className="w-6 h-6 text-primary" aria-hidden="true" />
            <span className="ml-3 font-montserrat text-foreground/90">
              Loved by 100+ families
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-alata text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Best Biryani in <span className="font-allura text-5xl md:text-7xl bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent drop-shadow-xl">Kalyan</span>
          </h1>

          {/* Subtitle */}
          <p className="font-montserrat text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Experience the royal taste of traditional biryani, crafted with love and 
            served fresh for your family's special moments.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/90 font-montserrat">
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
              <span>Free delivery within Kalyan</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold px-8 py-6 text-lg glow-gold"
              >
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 font-montserrat font-semibold px-8 py-6 text-lg"
              onClick={() => window.open('https://wa.me/919167682582', '_blank')}
              aria-label="Order now via WhatsApp - opens in new window"
            >
              Order Now via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;