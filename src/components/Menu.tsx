import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

import chickenBiryani from '@/assets/chicken-biryani.jpg';
import muttonBiryani from '@/assets/mutton-biryani.jpg';
import vegBiryani from '@/assets/veg-biryani.jpg';

const menuItems = [
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Tender chicken pieces marinated in aromatic spices, layered with fragrant basmati rice and cooked to perfection.',
    price: 299,
    image: chickenBiryani,
    rating: 4.8,
    reviews: 156,
    popular: true,
  },
  {
    id: 'mutton-biryani',
    name: 'Mutton Biryani',
    description: 'Succulent mutton slow-cooked with traditional spices, layered with premium basmati rice and saffron.',
    price: 399,
    image: muttonBiryani,
    rating: 4.9,
    reviews: 203,
    popular: true,
  },
  {
    id: 'veg-biryani',
    name: 'Vegetable Biryani',
    description: 'Fresh seasonal vegetables and paneer cooked with aromatic spices, nuts, and dried fruits in basmati rice.',
    price: 249,
    image: vegBiryani,
    rating: 4.7,
    reviews: 89,
    popular: false,
  },
  {
    id: 'hyderabadi-biryani',
    name: 'Hyderabadi Special',
    description: 'Our signature royal recipe with premium ingredients, served with boiled egg, raita, and shorba.',
    price: 499,
    image: chickenBiryani,
    rating: 5.0,
    reviews: 67,
    popular: true,
  },
  {
    id: 'family-pack',
    name: 'Family Pack (Serves 4)',
    description: 'Perfect for families! Choice of chicken or mutton biryani with raita, pickle, and dessert included.',
    price: 999,
    image: muttonBiryani,
    rating: 4.9,
    reviews: 124,
    popular: true,
  },
  {
    id: 'biryani-combo',
    name: 'Biryani Combo',
    description: 'Chicken biryani served with raita, pickle, boiled egg, and traditional sweets.',
    price: 349,
    image: chickenBiryani,
    rating: 4.6,
    reviews: 98,
    popular: false,
  },
];

const Menu = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <section id="menu" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-alata text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="font-allura text-primary text-5xl md:text-6xl">Menu</span>
          </h2>
          <p className="font-montserrat text-xl text-foreground/80 max-w-2xl mx-auto">
            Discover our carefully crafted biryani varieties, each made with authentic spices 
            and premium ingredients that have been perfected over generations.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth group overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-montserrat font-semibold">
                    Popular
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-foreground text-sm font-montserrat font-medium">
                    {item.rating}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-alata text-xl font-bold text-foreground">
                    {item.name}
                  </h3>
                  <span className="font-alata text-2xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                </div>
                
                <p className="font-montserrat text-foreground/70 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= Math.floor(item.rating) 
                              ? 'fill-primary text-primary' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-montserrat text-sm text-foreground/70">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold transition-smooth glow-gold"
                  size="lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-alata text-2xl font-bold text-foreground mb-4">
              Can't decide? Let us help!
            </h3>
            <p className="font-montserrat text-foreground/80 mb-6">
              Call us or message on WhatsApp for personalized recommendations based on your taste preferences.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/919876543210?text=Hi! I need help choosing the perfect biryani for my family.', '_blank')}
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 font-montserrat font-semibold"
              size="lg"
            >
              Get Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;