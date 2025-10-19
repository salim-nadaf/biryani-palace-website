import { useState, useEffect } from 'react';
import { Users, Crown, Utensils, Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/OptimizedImage';
import MenuItem from '@/components/MenuItem';
import Header from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';

import chickenBiryani from '@/assets/alishaan-tandoori-biryani.jpg';
import muttonBiryani from '@/assets/Mutton Biryani hero image.jpg';
import vegBiryani from '@/assets/nawabi-veg-dum-biryani.png';
import heroBiryani from '@/assets/Mutton Biryani hero image.jpg';
import chickenBiryaniVideo from '@/assets/chicken-biryani-serving.mp4';

// Import bucket biryani images
import chickenDumBucket1kg from '@/assets/chicken-dum-bucket-1kg.png';
import chickenDumBucket from '@/assets/chicken-dum-bucket.png';
import chickenTandoorBucket1kg from '@/assets/chicken-tandoor-bucket-1kg.png';
import chickenTandooriBucket from '@/assets/chicken-tandoori-bucket.png';

// Import menu item images
import alishaan from '@/assets/alishaan-tandoori-biryani.jpg';
import banjaraBiryani from '@/assets/banjara-e-biryani.png';
import bonelessLazzat from '@/assets/boneless-lazzat-e-tikka-biryani.png';
import bonelessTikkaMasala from '@/assets/boneless-tikka-masala.png';
import dhanShikori from '@/assets/dhan-e-shikori-gosht.png';
import goshtDum from '@/assets/gosht-e-dum-mazedaar.jpeg';
import hyderabadiMurgh from '@/assets/hyderabadi-murgh-dum.png';
import hyderabadiMutton from '@/assets/hyderabadi-mutton-dum.png';
import kadhaiPaneer from '@/assets/kadhai-paneer-nawabi.png';
import kebabFirangi from '@/assets/kebab-e-firangi.jpeg';
import kebabRoyale from '@/assets/kebab-royale-sticks.jpeg';
import lababdaarSheekh from '@/assets/lababdaar-seekh-biryani.jpg';
import lazzatTikka from '@/assets/lazzat-e-tikka-biryani.png';
import makhmali from '@/assets/makhmali-malai-biryani.jpg';
import masaledarGosht from '@/assets/masaledar-gosht-curry.png';
import masaledarMurgh from '@/assets/masaledar-murgh.png';
import murghAngaara from '@/assets/murgh-angaara.png';
import murghKolhapuri from '@/assets/murgh-kolhapuri-e-zaiqa.png';
import murghTikkaMasala from '@/assets/murgh-tikka-masala.png';
import nawabiVeg from '@/assets/nawabi-veg-dum-biryani.png';
import nayaabiItaliano from '@/assets/nayaabi-italiano-biryani.jpeg';
import nazaakatPulao from '@/assets/nazaakat-pulao.png';
import paneerFirangi from '@/assets/paneer-e-firangi.png';
import paneerTikkaBiryani from '@/assets/paneer-e-tikka-biryani.png';
import paneerTikkaMasala from '@/assets/paneer-e-tikka-masala.png';
import sabzTikka from '@/assets/sabz-tikka-biryani.png';
import sabziyonZaika from '@/assets/sabziyon-ka-zaika.png';
import shahiMurghKorma from '@/assets/shahi-murgh-korma.png';
import shahiMurghRolls from '@/assets/shahi-murgh-rolls.jpeg';
import tandooriTaaj from '@/assets/tandoori-taaj-leg.jpg';
import ustaadiMurgh from '@/assets/ustaadi-murgh-dum.jpeg';
import zamZamLazawaab from '@/assets/zam-zam-lazawaab-biryani.jpg';

// Bucket Biryani Images for carousel
const bucketBiryaniImages = [
  chickenDumBucket1kg,
  chickenDumBucket,
  chickenTandoorBucket1kg,
  chickenTandooriBucket,
];

// Bulk Order Plans
const bulkOrderPlans = [
  {
    id: 'mehmaan-plan',
    name: 'The Mehmaan Plan',
    guests: '10–15 Guests',
    quantity: '5 KG Total',
    items: 'Biryani + Starter + Gravy',
    freebie: 'Free Gulab Jamun (10 pcs)',
    price: 3499,
    popular: false,
  },
  {
    id: 'shaahi-dawat',
    name: 'The Shaahi Dawat',
    guests: '20–30 Guests',
    quantity: '10 KG Total',
    items: '2 Biryani Flavors + 2 Gravies + Starters',
    freebie: 'Free Gulab Jamun or Soft Drink',
    price: 6999,
    popular: true,
  },
  {
    id: 'royal-baithak',
    name: 'The Royal Baithak',
    guests: '40–50 Guests',
    quantity: '15 KG Total',
    items: 'Choose 3 Biryanis + 3 Gravies + Starters',
    freebie: 'Free Dessert + Drinks + Salad',
    price: 12999,
    popular: false,
  },
];

const menuCategories = [
  {
    id: 'traditional-dum-biryanis',
    name: 'Traditional Dum Biryanis',
    items: [
      {
        id: 'hyderabadi-mutton-dum',
        name: 'Hyderabadi Mutton Dum',
        description: 'Tender mutton layered with flavorful rice — true to Deccan tradition.',
        price: 1499,
        image: hyderabadiMutton,
        rating: 4.3,
        reviews: 167,
        popular: true,
        isNew: false,
        tag: 'Popular',
      },
      {
        id: 'gosht-e-dum-mazedaar',
        name: 'Gosht-e-Dum Mazedaar',
        description: 'Juicy mutton cooked on dum with deep, savory spices.',
        price: 1499,
        image: goshtDum,
        rating: 4.8,
        reviews: 145,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },
      {
        id: 'hyderabadi-murgh-dum',
        name: 'Hyderabadi Murgh Dum',
        description: 'The iconic Hyderabadi chicken biryani — spicy, rich, and aromatic.',
        price: 899,
        image: hyderabadiMurgh,
        rating: 4.2,
        reviews: 134,
        popular: true,
        isNew: false,
        tag: 'Popular',
      },
      {
        id: 'ustaadi-murgh-dum',
        name: 'Ustaadi Murgh Dum',
        description: 'Classic chicken biryani slow-cooked in the traditional dum style.',
        price: 899,
        image: ustaadiMurgh,
        rating: 4.9,
        reviews: 156,
        popular: false,
        isNew: false,
        tag: "Chef's special",
      },
    ]
  },
  {
    id: 'biryani-reimagined',
    name: 'Biryani Reimagined',
    items: [
      {
        id: 'zam-zam-lazawaab-biryani',
        name: 'Zam-Zam Lazawaab Biryani',
        description: 'Mutton, chicken balls, liver & eggs — all in one glorious biryani.',
        price: 1299,
        image: zamZamLazawaab,
        rating: 4.5,
        reviews: 78,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },
      {
        id: 'nayaabi-italiano-biryani',
        name: 'Nayaabi Italiano Biryani',
        description: 'A rare fusion of mayo, cheese, herbs and desi dum biryani — bold and one-of-a-kind.',
        price: 1099,
        image: nayaabiItaliano,
        rating: 4.1,
        reviews: 45,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },
      {
        id: 'makhmali-malai-biryani',
        name: 'Makhmali Malai Biryani',
        description: 'A silky, creamy chicken biryani with subtle spices and rich texture.',
        price: 999,
        image: makhmali,
        rating: 4.9,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },
      {
        id: 'banjara-e-biryani',
        name: 'Banjara-e-Biryani',
        description: 'Rustic and rich in flavor — inspired by malai biryani, finished with a fiery kick.',
        price: 799,
        image: banjaraBiryani,
        rating: 0,
        reviews: 0,
        popular: false,
        isNew: true,
        tag: 'New',
      },
    ]
  },
  {
    id: 'crowned-flavours',
    name: 'Crowned Flavours',
    items: [
      {
        id: 'boneless-lazzat-e-tikka-biryani',
        name: 'Boneless Lazzat-e-Tikka Biryani',
        description: 'Boneless chicken tikka tossed in smoky, aromatic rice with rich undertones of flavor.',
        price: 1099,
        image: bonelessLazzat,
        rating: 5.0,
        reviews: 87,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },
      {
        id: 'lababdaar-seekh-biryani',
        name: 'Lababdaar Seekh Biryani',
        description: 'Juicy seekh kebabs infused with spices and layered into biryani.',
        price: 1099,
        image: lababdaarSheekh,
        rating: 4.9,
        reviews: 203,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },
      {
        id: 'lazzat-e-tikka-biryani',
        name: 'Lazzat-e-Tikka Biryani',
        description: 'Chicken tikka tossed in smoky, aromatic rice with rich undertones of flavor.',
        price: 899,
        image: lazzatTikka,
        rating: 5.0,
        reviews: 124,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },
      {
        id: 'alishaan-tandoori-biryani',
        name: 'Alishaan Tandoori Biryani',
        description: 'Tandoori-marinated chicken layered with fragrant rice in a bold, royal style.',
        price: 899,
        image: alishaan,
        rating: 4.5,
        reviews: 156,
        popular: true,
        isNew: false,
        tag: 'Popular',
      },
    ]
  },
  {
    id: 'vegetarian-royalty',
    name: 'Vegetarian Royalty',
    items: [
      {
        id: 'paneer-e-tikka-biryani',
        name: 'Paneer-e-Tikka Biryani',
        description: 'Tandoori-style paneer tikka folded into flavorful biryani rice.',
        price: 1099,
        image: paneerTikkaBiryani,
        rating: 4.1,
        reviews: 98,
        popular: false,
        isNew: false,
        tag: 'Must Try',
      },
      {
        id: 'sabz-tikka-biryani',
        name: 'Sabz Tikka Biryani',
        description: 'Veg tikka smokey masala blend, layered with fragrant rice.',
        price: 849,
        image: sabzTikka,
        rating: 4.5,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },
      {
        id: 'nawabi-veg-dum-biryani',
        name: 'Nawabi Veg Dum Biryani',
        description: 'A royal mix of seasonal vegetables in a spiced dum-style biryani.',
        price: 799,
        image: nawabiVeg,
        rating: 4.2,
        reviews: 76,
        popular: false,
        isNew: false,
        tag: "Chef's special",
      },
      {
        id: 'nazaakat-pulao',
        name: 'Nazaakat Pulao',
        description: 'A delicate and aromatic vegetable pulao with mild seasoning.',
        price: 699,
        image: nazaakatPulao,
        rating: 4.1,
        reviews: 43,
        popular: false,
        isNew: true,
        tag: 'New',
      },
    ]
  },
  {
    id: 'curries-gravies',
    name: 'Curries & Gravies',
    items: [
      {
        id: 'dhan-e-shikori-gosht',
        name: 'Dhan-e-Shikori Gosht',
        description: 'Rustic Kokani mutton curry with coconut and coriander — bold and aromatic.',
        price: 1199,
        image: dhanShikori,
        rating: 0,
        reviews: 0,
        popular: false,
        isNew: true,
        tag: 'New',
      },
      {
        id: 'masaledar-gosht-curry',
        name: 'Masaledar Gosht Curry',
        description: 'Fiery and flavorful mutton curry cooked in rich masala gravy.',
        price: 899,
        image: masaledarGosht,
        rating: 4.7,
        reviews: 56,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'boneless-tikka-masala',
        name: 'Boneless Tikka Masala',
        description: 'Tikka masala made with soft boneless chicken pieces.',
        price: 849,
        image: bonelessTikkaMasala,
        rating: 4.9,
        reviews: 76,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'murgh-angaara',
        name: 'Murgh Angaara',
        description: 'Smoky, spicy chicken curry with bold tandoori flavor.',
        price: 649,
        image: murghAngaara,
        rating: 4.7,
        reviews: 78,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'shahi-murgh-korma',
        name: 'Shahi Murgh Korma',
        description: 'Rich and creamy chicken korma in traditional Mughlai style.',
        price: 649,
        image: shahiMurghKorma,
        rating: 4.8,
        reviews: 92,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'masaledar-murgh',
        name: 'Masaledar Murgh',
        description: 'A robust chicken curry with strong, home-style spice punch.',
        price: 649,
        image: masaledarMurgh,
        rating: 4.6,
        reviews: 65,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'murgh-tikka-masala',
        name: 'Murgh Tikka Masala',
        description: 'Classic tikka curry with a luscious gravy — rich and hearty.',
        price: 649,
        image: murghTikkaMasala,
        rating: 4.8,
        reviews: 87,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'murgh-kolhapuri-e-zaiqa',
        name: 'Murgh Kolhapuri-e-Zaiqa',
        description: 'Spicy and rustic chicken curry from the heart of Kolhapur.',
        price: 649,
        image: murghKolhapuri,
        rating: 4.7,
        reviews: 58,
        popular: false,
        isNew: false,
        tag: '',
      },
    ]
  },
  {
    id: 'palace-veg-delights',
    name: 'Palace Veg Delights',
    items: [
      {
        id: 'paneer-e-tikka-masala',
        name: 'Paneer-e-Tikka Masala',
        description: 'Paneer tikka in creamy, smokey based gravy.',
        price: 899,
        image: paneerTikkaMasala,
        rating: 4.6,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'kadhai-paneer-nawabi',
        name: 'Kadhai Paneer Nawabi',
        description: 'Chunky paneer tossed in kadhai-style spices with a royal finish.',
        price: 899,
        image: kadhaiPaneer,
        rating: 4.5,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'paneer-e-firangi',
        name: 'Paneer-e-Firangi',
        description: 'Indo-fusion paneer curry with a creamy and lightly spiced twist',
        price: 749,
        image: paneerFirangi,
        rating: 4.4,
        reviews: 38,
        popular: false,
        isNew: false,
        tag: '',
      },
      {
        id: 'sabziyon-ka-zaika',
        name: 'Sabziyon ka Zaika',
        description: 'A medley of seasonal vegetables in traditional Indian masala.',
        price: 649,
        image: sabziyonZaika,
        rating: 4.4,
        reviews: 43,
        popular: false,
        isNew: true,
        tag: 'New',
      },
    ]
  },
  {
    id: 'starters-kebabs',
    name: 'Starters & Kebabs',
    items: [
      {
        id: 'kebab-royale-sticks',
        name: 'Kebab Royale Sticks',
        description: 'Tandoori-marinated chicken grilled with bell peppers and onions, a royal skewer delight.',
        price: 599,
        image: kebabRoyale,
        rating: 4.7,
        reviews: 89,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },
      {
        id: 'kebab-e-firangi',
        name: 'Kebab-e-Firangi',
        description: 'Creamy chicken-potato ovals coated in vermicelli and deep-fried crisp.',
        price: 549,
        image: kebabFirangi,
        rating: 4.6,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },
      {
        id: 'shahi-murgh-rolls',
        name: 'Shahi Murgh Rolls',
        description: 'Cheese‑filled chicken kebab roll, crispy‑fried and bursting with spice.',
        price: 549,
        image: shahiMurghRolls,
        rating: 4.5,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },
      {
        id: 'tandoori-taaj-leg',
        name: 'Tandoori Taaj Leg',
        description: 'Large chicken leg marinated in royal tandoori spices and roasted.',
        price: 499,
        image: tandooriTaaj,
        rating: 4.8,
        reviews: 76,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },
    ]
  },
];

const MenuPage = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const handleBulkOrderContact = (plan: any) => {
    const message = `Hi! I'm interested in ${plan.name} for ${plan.guests}. Can you provide more details?`;
    window.open(`https://wa.me/919167682582?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBucketOrderContact = () => {
    const message = 'Hi! I want to check availability for Bucket Biryani specials. Please share the options.';
    window.open(`https://wa.me/919167682582?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'best seller':
        return 'bg-primary text-primary-foreground';
      case 'must try':
        return 'bg-orange-600 text-white';
      case "chef's special":
        return 'bg-purple-600 text-white';
      case 'popular':
        return 'bg-green-600 text-white';
      case 'new':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
        {/* Hero Video Section - Desktop Only */}
        {!isMobile && (
          <div className="relative mb-20 -mt-4">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop
                preload="none"
                playsInline
                className="w-full h-[75vh] md:h-[80vh] lg:h-[85vh] object-cover"
                style={{ 
                  objectPosition: 'center 65%',
                  transform: 'scale(1.1)',
                  transformOrigin: 'center 65%'
                }}
                poster={heroBiryani}
              >
                <source src={chickenBiryaniVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6 max-w-4xl mx-auto">
                    <h1 className="font-alata text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                      Our <span className="font-allura text-primary text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">Royal Menu</span>
                    </h1>
                    <p className="font-montserrat text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                      Experience the authentic taste of royal biryani, crafted with premium ingredients 
                      and served fresh from our kitchen to your table
                    </p>
                  </div>
                </div>
                
                {/* Bottom Corner Badge */}
                <div className="absolute bottom-6 right-6">
                  <div className="bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-semibold text-sm flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Fresh & Hot Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile Hero - Static Image Only */}
        {isMobile && (
          <div className="relative mb-12 -mt-4">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl h-[50vh]">
              <img 
                src={heroBiryani}
                alt="Royal biryani menu"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 65%' }}
                loading="eager"
              />
              
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6 max-w-4xl mx-auto">
                    <h1 className="font-alata text-3xl font-bold mb-4 animate-fade-in">
                      Our <span className="font-allura text-primary text-4xl drop-shadow-lg">Royal Menu</span>
                    </h1>
                    <p className="font-montserrat text-base text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                      Experience the authentic taste of royal biryani
                    </p>
                  </div>
                </div>
                
                {/* Bottom Corner Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-white font-semibold text-xs flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Fresh & Hot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      <section id="menu" className="py-12 px-4">
        <div className="container mx-auto">

          {/* Bucket Biryani Specials */}
          <div className="mb-20">
            <h2 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
              <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Bucket Biryani Specials</span>
            </h2>
            
            <Card className="bg-gradient-card border-2 border-primary/30 overflow-hidden max-w-6xl mx-auto">
              <CardContent className="p-8">
                {/* Carousel */}
                <div className="relative mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                     {bucketBiryaniImages.map((image, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-lg">
                         <OptimizedImage
                           src={image}
                           alt={`Bucket Biryani ${index + 1}`}
                           className="w-full h-36 object-cover transition-smooth group-hover:scale-110"
                         />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                          <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">
                            Steam Fresh
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="font-montserrat text-lg text-foreground/80 mb-4">
                    "Introducing our royal Bucket Biryani — served hot and fresh in party-size buckets. Perfect for family feasts, celebrations, or a cozy weekend indulgence."
                  </p>
                  
                  {/* Pricing */}
                   <div className="text-center mb-4">
                     <div className="font-alata text-3xl md:text-4xl font-bold text-primary mb-2">
                       Starting from
                     </div>
                     <br />
                     <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                       <div className="text-center">
                         <div className="font-alata text-lg font-bold text-foreground">Half Kg</div>
                         <div className="font-montserrat text-primary font-semibold">₹509 onwards</div>
                       </div>
                       <div className="text-center">
                         <div className="font-alata text-lg font-bold text-foreground">Full Kg</div>
                         <div className="font-montserrat text-primary font-semibold">₹929 onwards</div>
                       </div>
                     </div>
                   </div>
                  
                  {/* Disclaimer */}
                  <p className="font-montserrat text-xs text-foreground/60 mb-6">
                    *Half kg options are available only on select items and may require advance confirmation.
                  </p>
                  
                    {/* CTA Button */}
                    <div className="flex justify-center px-4">
                      <Button
                        onClick={handleBucketOrderContact}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold glow-gold w-full max-w-md text-base py-3 px-6"
                        size="lg"
                      >
                        <span className="hidden md:inline">Check Availability on WhatsApp</span>
                        <span className="md:hidden">WhatsApp</span>
                      </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bulk Order Plans */}
          <div className="mb-20">
            <h3 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
              <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Bulk Order Plans</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {bulkOrderPlans.map((plan) => (
                <Card key={plan.id} className={`bg-gradient-card border-2 transition-smooth group overflow-hidden relative ${
                  plan.popular ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.3)]' : 'border-border hover:border-primary/50'
                }`}>
                   {plan.popular && (
                     <div className="absolute top-2 left-2 z-20">
                       <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded text-xs font-montserrat font-bold flex items-center gap-1 shadow-lg">
                         <Crown className="w-3 h-3" />
                         Most Popular
                       </div>
                     </div>
                   )}
                  
                  <CardContent className="p-6 text-center">
                    <h4 className="font-alata text-2xl font-bold text-foreground mb-4 mt-2">
                      {plan.name}
                    </h4>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-center gap-2 text-foreground/80">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-montserrat font-medium">{plan.guests} • {plan.quantity}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-foreground/80">
                        <Utensils className="w-5 h-5 text-primary" />
                        <span className="font-montserrat text-sm">{plan.items}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Gift className="w-5 h-5" />
                        <span className="font-montserrat text-sm font-medium">{plan.freebie}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <span className="font-alata text-3xl font-bold text-primary">₹{plan.price.toLocaleString()}</span>
                      <span className="font-montserrat text-sm text-foreground/60 ml-1">total</span>
                    </div>
                    
                    <Button
                      onClick={() => handleBulkOrderContact(plan)}
                      className={`w-full font-montserrat font-semibold transition-smooth ${
                        plan.popular 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground glow-gold' 
                          : 'bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/30'
                      }`}
                      size="lg"
                    >
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Menu Categories */}
          {menuCategories.map((category) => (
            <div key={category.id} className="mb-16">
              {/* Category Header */}
              <h3 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
                <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>{category.name}</span>
              </h3>
              
              {/* Category Items Grid - 4 items per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    getTagColor={getTagColor}
                  />
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
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default MenuPage;