import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { CartSidebar } from './CartSidebar';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="font-alata text-2xl font-bold text-foreground">
                Biryani Palace
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
              >
                Contact
              </button>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative border-primary/50 hover:border-primary hover:bg-primary/10"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-foreground hover:text-primary hover:bg-primary/10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-primary/20 pt-4">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                >
                  Contact
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;