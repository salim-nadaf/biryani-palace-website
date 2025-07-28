import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

import chickenBiryani from '@/assets/chicken-biryani.jpg';
import muttonBiryani from '@/assets/mutton-biryani.jpg';
import vegBiryani from '@/assets/veg-biryani.jpg';

const menuCategories = [
  {
    id: 'bucket-biryani',
    name: 'Bucket Biryani',
    items: [
      {
        id: 'murgh-dum-biryani',
        name: 'Murgh Dum Biryani',
        description: 'Tender chicken pieces marinated in aromatic spices, layered with fragrant basmati rice and cooked to perfection in half kg bucket.',
        price: 509,
        image: chickenBiryani,
        rating: 4.8,
        reviews: 156,
        popular: true,
        isNew: false,
      },
      {
        id: 'murgh-tandoor-biryani',
        name: 'Murgh Tandoor Biryani',
        description: 'Succulent tandoor-cooked chicken layered with premium basmati rice and traditional spices in half kg bucket.',
        price: 509,
        image: chickenBiryani,
        rating: 4.9,
        reviews: 203,
        popular: true,
        isNew: false,
      },
    ]
  },
  {
    id: 'signature-creation',
    name: 'Signature Creation',
    items: [
      {
        id: 'makhmali-murgh-malai',
        name: 'Makhmali Murgh Malai Biryani',
        description: 'Creamy and rich chicken malai biryani with cashews and cream, a royal delicacy per kg.',
        price: 999,
        image: chickenBiryani,
        rating: 5.0,
        reviews: 67,
        popular: true,
        isNew: false,
      },
      {
        id: 'murgh-banjara-biryani',
        name: 'Murgh Banjara Biryani',
        description: 'Traditional nomadic style chicken biryani with wild spices and rustic flavors per kg.',
        price: 799,
        image: chickenBiryani,
        rating: 4.7,
        reviews: 89,
        popular: false,
        isNew: true,
      },
    ]
  },
  {
    id: 'tikka-biryani-mahal',
    name: 'Tikka Biryani Mahal',
    items: [
      {
        id: 'lazzatdaar-murgh-tikka',
        name: 'Lazzatdaar Murgh Tikka Biryani',
        description: 'Smoky tandoori chicken tikka layered with aromatic basmati rice and royal spices per kg.',
        price: 899,
        image: chickenBiryani,
        rating: 4.8,
        reviews: 124,
        popular: true,
        isNew: false,
      },
      {
        id: 'lazzatdaar-murgh-tikka-boneless',
        name: 'Lazzatdaar Murgh Tikka Biryani - Boneless',
        description: 'Premium boneless tandoori chicken tikka with aromatic basmati rice and royal spices per kg.',
        price: 1099,
        image: chickenBiryani,
        rating: 4.9,
        reviews: 87,
        popular: false,
        isNew: false,
      },
      {
        id: 'paneer-tikka-biryani',
        name: 'Paneer Tikka Biryani',
        description: 'Grilled paneer tikka with fragrant rice, nuts, and exotic spices per kg.',
        price: 1099,
        image: vegBiryani,
        rating: 4.6,
        reviews: 98,
        popular: false,
        isNew: false,
      },
      {
        id: 'veg-tikka-biryani',
        name: 'Veg Tikka Biryani',
        description: 'Assorted grilled vegetables with basmati rice and aromatic spices per kg.',
        price: 849,
        image: vegBiryani,
        rating: 4.5,
        reviews: 76,
        popular: false,
        isNew: false,
      },
    ]
  },
  {
    id: 'gosht-ki-dawat',
    name: 'Gosht ki Dawat',
    items: [
      {
        id: 'mazedasar-gosht-dum',
        name: 'Mazedasar Gosht Dum Biryani',
        description: 'Slow-cooked mutton with traditional spices, layered with premium basmati rice per kg.',
        price: 1499,
        image: muttonBiryani,
        rating: 4.9,
        reviews: 145,
        popular: true,
        isNew: false,
      },
      {
        id: 'gosht-hyderabadi',
        name: 'Gosht Hyderabadi Biryani',
        description: 'Authentic Hyderabadi style mutton biryani with saffron and royal spices per kg.',
        price: 1499,
        image: muttonBiryani,
        rating: 5.0,
        reviews: 167,
        popular: true,
        isNew: false,
      },
    ]
  },
];

const Menu = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
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
            Our <span className="font-allura text-primary text-5xl md:text-6xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Menu</span>
          </h2>
          <p className="font-montserrat text-xl text-foreground/80 max-w-2xl mx-auto">
            Discover our carefully crafted biryani varieties, each made with authentic spices 
            and premium ingredients that have been perfected over generations.
          </p>
        </div>

        {/* Menu Categories */}
        {menuCategories.map((category) => (
          <div key={category.id} className="mb-16">
            {/* Category Header */}
            <h3 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
              <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>{category.name}</span>
            </h3>
            
            {/* Category Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <Card key={item.id} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth group overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-smooth"
                    />
                    {item.popular && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        Popular
                      </div>
                    )}
                    {item.isNew && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        New Launch
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-foreground text-xs font-montserrat font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-alata text-lg font-bold text-foreground leading-tight">
                        {item.name}
                      </h4>
                      <span className="font-alata text-xl font-bold text-primary">
                        ₹{item.price}
                      </span>
                    </div>
                    
                    <p className="font-montserrat text-foreground/70 mb-3 text-xs leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3 h-3 ${
                                star <= Math.floor(item.rating) 
                                  ? 'fill-primary text-primary' 
                                  : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="font-montserrat text-xs text-foreground/70">
                          ({item.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold transition-smooth glow-gold"
                      size="sm"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-alata text-2xl font-bold text-foreground mb-4">
              Can't decide? Let us help!
            </h3>
            <p className="font-montserrat text-foreground/80 mb-6">
              Call us or message on WhatsApp for personalized recommendations based on your taste preferences.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => window.open('https://wa.me/919167682582?text=Hi! I need help choosing the perfect biryani for my family.', '_blank')}
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 font-montserrat font-semibold"
                size="lg"
              >
                Get Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;