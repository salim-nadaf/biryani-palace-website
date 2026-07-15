import { useState, useEffect, memo, useCallback, lazy, Suspense } from 'react';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Lazy load CartSidebar since it's not needed on initial render
const CartSidebar = lazy(() => import('./CartSidebar').then(m => ({ default: m.CartSidebar })));

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogoutToast = () => {
      toast({
        title: "Logged Out Successfully",
        description: "You have been logged out of your account.",
      });
    };

    window.addEventListener('showLogoutToast', handleLogoutToast);
    return () => window.removeEventListener('showLogoutToast', handleLogoutToast);
  }, [toast]);

  const scrollToSection = useCallback((sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  const handleHomeClick = useCallback(() => {
    if (location.pathname === '/') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" aria-label="Biryani Palace home">
              <div className="font-alata text-2xl font-bold text-foreground hover:text-primary transition-smooth">
                Biryani <span className="font-allura text-3xl text-primary">Palace</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              <button
                onClick={handleHomeClick}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
                aria-label="Navigate to home page"
              >
                Home
              </button>
              <Link
                to="/menu"
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
                aria-label="View our menu"
              >
                Menu
              </Link>
              <Link
                to="/biryani-calculator"
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
                aria-label="Open biryani quantity calculator"
              >
                Calculator
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
                aria-label="Learn about us"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-smooth font-montserrat"
                aria-label="Contact us"
              >
                Contact
              </button>
            </nav>

            {/* User Info, Cart & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* User Welcome Message */}
              {isLoggedIn && user && (
                <div className="hidden lg:flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-montserrat text-sm text-foreground font-medium">
                      Hi, {user.name.split(' ')[0]}!
                    </p>
                  </div>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2" aria-label="User menu">
                        <User className="w-5 h-5 text-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={openCart}
                className="relative border-primary/50 hover:border-primary hover:bg-primary/10 z-[10000]"
                aria-label="Open shopping cart"
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
                onClick={toggleMenu}
                className="md:hidden text-foreground hover:text-primary hover:bg-primary/10"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-primary/20 pt-4">
              <div className="flex flex-col space-y-3">
                {/* Mobile User Info */}
                {isLoggedIn && user && (
                  <div className="pb-3 border-b border-primary/20 mb-3">
                    <p className="font-montserrat text-foreground font-medium">
                      Hi, {user.name.split(' ')[0]}!
                    </p>
                    <button
                      onClick={logout}
                      className="flex items-center mt-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
                
                <button
                  onClick={handleHomeClick}
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                >
                  Home
                </button>
                <Link
                  to="/menu"
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link
                  to="/biryani-calculator"
                  className="text-left text-foreground hover:text-primary transition-smooth font-montserrat py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calculator
                </Link>
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

      <Suspense fallback={null}>
        {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={closeCart} />}
      </Suspense>
    </>
  );
});

Header.displayName = 'Header';

export default Header;