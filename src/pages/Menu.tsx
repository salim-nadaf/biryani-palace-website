import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Crown, Utensils, Gift, Search, X, Download } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/OptimizedImage';
import LazyMenuItem from '@/components/LazyMenuItem';
import Header from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';

// Hero image
import heroBiryani from '@/assets/mutton-biryani-hero.webp';
import chickenBiryaniVideoSrc from '@/assets/chicken-biryani-serving.mp4';

// Import original bucket biryani images
import chickenDumBucket1kg from '@/assets/chicken-dum-bucket-1kg.webp';
import chickenDumBucket from '@/assets/chicken-dum-bucket.webp';
import chickenTandoorBucket1kg from '@/assets/chicken-tandoor-bucket-1kg.webp';
import chickenTandooriBucket from '@/assets/chicken-tandoori-bucket.webp';

// Lazy import menu images - paths only, will be resolved by bundler
const menuImages = {
  alishaan: () => import('@/assets/alishaan-tandoori-biryani.webp'),
  banjaraBiryani: () => import('@/assets/banjara-e-biryani.webp'),
  bonelessLazzat: () => import('@/assets/boneless-lazzat-e-tikka-biryani.webp'),
  bonelessTikkaMasala: () => import('@/assets/boneless-tikka-masala.webp'),
  dhanShikori: () => import('@/assets/dhan-e-shikori-gosht.webp'),
  goshtDum: () => import('@/assets/gosht-e-dum-mazedaar.webp'),
  hyderabadiMurgh: () => import('@/assets/hyderabadi-murgh-dum.webp'),
  hyderabadiMutton: () => import('@/assets/hyderabadi-mutton-dum.webp'),
  kadhaiPaneer: () => import('@/assets/kadhai-paneer-nawabi.webp'),
  kebabFirangi: () => import('@/assets/kebab-e-firangi.webp'),
  kebabRoyale: () => import('@/assets/kebab-royale-sticks.webp'),
  lababdaarSheekh: () => import('@/assets/lababdaar-seekh-biryani.webp'),
  lazzatTikka: () => import('@/assets/lazzat-e-tikka-biryani.webp'),
  makhmali: () => import('@/assets/makhmali-malai-biryani.webp'),
  masaledarGosht: () => import('@/assets/masaledar-gosht-curry.webp'),
  masaledarMurgh: () => import('@/assets/masaledar-murgh.webp'),
  murghAngaara: () => import('@/assets/murgh-angaara.webp'),
  murghKolhapuri: () => import('@/assets/murgh-kolhapuri-e-zaiqa.webp'),
  murghTikkaMasala: () => import('@/assets/murgh-tikka-masala.webp'),
  nawabiVeg: () => import('@/assets/nawabi-veg-dum-biryani.webp'),
  nayaabiItaliano: () => import('@/assets/nayaabi-italiano-biryani.webp'),
  nazaakatPulao: () => import('@/assets/nazaakat-pulao.webp'),
  paneerFirangi: () => import('@/assets/paneer-e-firangi.webp'),
  paneerTikkaBiryani: () => import('@/assets/paneer-e-tikka-biryani.webp'),
  paneerTikkaMasala: () => import('@/assets/paneer-e-tikka-masala.webp'),
  sabzTikka: () => import('@/assets/sabz-tikka-biryani.webp'),
  sabziyonZaika: () => import('@/assets/sabziyon-ka-zaika.webp'),
  shahiMurghKorma: () => import('@/assets/shahi-murgh-korma.webp'),
  shahiMurghRolls: () => import('@/assets/shahi-murgh-rolls.webp'),
  tandooriTaaj: () => import('@/assets/tandoori-taaj-leg.webp'),
  ustaadiMurgh: () => import('@/assets/ustaadi-murgh-dum.webp'),
  zamZamLazawaab: () => import('@/assets/zam-zam-lazawaab-biryani.webp'),
};

// Bucket Biryani Images for carousel
const bucketBiryaniImages = [
  chickenDumBucket1kg,
  chickenDumBucket,
  chickenTandoorBucket1kg,
  chickenTandooriBucket,
];

// Bulk Order Plans
const bulkOrderPlans = [{
    id: 'royal-baithak',
    name: 'The Royal Baithak',
    guests: '40-50 Guests',
    quantity: '15 KG Total',
    items: 'Biryani: 3 Choices • Gravy: 1 Choice • Starter: 2 Choices',
    freebie: 'Dessert+Drinks: Free',
    price: 13999,
    popular: false,
  },{
    id: 'shaahi-dawat',
    name: 'The Shahi Dawat',
    guests: '20-30 Guests',
    quantity: '10 KG Total',
    items: 'Biryani: 2 Choices • Gravy: 1 Choice • Starter: 1 Choice',
    freebie: 'Dessert: Free',
    price: 8999,
    popular: true,
  },
  {
    id: 'mehmaan-plan',
    name: 'The Mehmaan plan',
    guests: '10-15 Guests',
    quantity: '05 KG Total',
    items: 'Biryani: 3 Choices • Gravy: 1 Choice • Starter: 1 Choice',
    freebie: 'Dessert: Free',
    price: 4499,
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
        price: 1899,
        imageKey: 'hyderabadiMutton',
        rating: 4.3,
        reviews: 167,
        popular: true,
        isNew: false,
        tag: 'Popular',
      },{
        id: 'gosht-e-dum-mazedaar',
        name: 'Gosht-e-Dum Mazedaar',
        description: 'Juicy mutton cooked on dum with deep, savory spices.',
        price: 1599,
        imageKey: 'goshtDum',
        rating: 4.8,
        reviews: 145,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },{
        id: 'hyderabadi-murgh-dum',
        name: 'Hyderabadi Murgh Dum',
        description: 'The iconic Hyderabadi chicken biryani — spicy, rich, and aromatic.',
        price: 1099,
        imageKey: 'hyderabadiMurgh',
        rating: 4.2,
        reviews: 134,
        popular: true,
        isNew: false,
        tag: 'Popular',
      },{
        id: 'ustaadi-murgh-dum',
        name: 'Ustaadi Murgh Dum',
        description: 'Classic chicken biryani slow-cooked in the traditional dum style.',
        price: 999,
        imageKey: 'ustaadiMurgh',
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
        price: 1899,
        imageKey: 'zamZamLazawaab',
        rating: 4.5,
        reviews: 78,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },{
        id: 'nayaabi-italiano-biryani',
        name: 'Nayaabi Italiano Biryani',
        description: 'A rare fusion of mayo, cheese, herbs and desi dum biryani — bold and one-of-a-kind.',
        price: 1299,
        imageKey: 'nayaabiItaliano',
        rating: 4.1,
        reviews: 45,
        popular: false,
        isNew: false,
        tag: 'Must try',
      },{
        id: 'makhmali-malai-biryani',
        name: 'Makhmali Malai Biryani',
        description: 'A silky, creamy chicken biryani with subtle spices and rich texture.',
        price: 1199,
        imageKey: 'makhmali',
        rating: 4.9,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },{
        id: 'banjara-e-biryani',
        name: 'Banjara-e-Biryani',
        description: 'Rustic and rich in flavor — inspired by malai biryani, finished with a fiery kick.',
        price: 1099,
        imageKey: 'banjaraBiryani',
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
        price: 1299,
        imageKey: 'bonelessLazzat',
        rating: 5.0,
        reviews: 87,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },{
        id: 'lababdaar-seekh-biryani',
        name: 'Lababdaar Seekh Biryani',
        description: 'Juicy seekh kebabs infused with spices and layered into biryani.',
        price: 1299,
        imageKey: 'lababdaarSheekh',
        rating: 4.9,
        reviews: 203,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },{
        id: 'lazzat-e-tikka-biryani',
        name: 'Lazzat-e-Tikka Biryani',
        description: 'Chicken tikka tossed in smoky, aromatic rice with rich undertones of flavor.',
        price: 1099,
        imageKey: 'lazzatTikka',
        rating: 5.0,
        reviews: 124,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },{
        id: 'alishaan-tandoori-biryani',
        name: 'Alishaan Tandoori Biryani',
        description: 'Tandoori-marinated chicken layered with fragrant rice in a bold, royal style.',
        price: 1099,
        imageKey: 'alishaan',
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
        price: 1199,
        imageKey: 'paneerTikkaBiryani',
        rating: 4.1,
        reviews: 98,
        popular: false,
        isNew: false,
        tag: 'Must Try',
      },{
        id: 'sabz-tikka-biryani',
        name: 'Sabz Tikka Biryani',
        description: 'Veg tikka smokey masala blend, layered with fragrant rice.',
        price: 899,
        imageKey: 'sabzTikka',
        rating: 4.5,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: 'Best seller',
      },{
        id: 'nawabi-veg-dum-biryani',
        name: 'Nawabi Veg Dum Biryani',
        description: 'A royal mix of seasonal vegetables in a spiced dum-style biryani.',
        price: 849,
        imageKey: 'nawabiVeg',
        rating: 4.2,
        reviews: 76,
        popular: false,
        isNew: false,
        tag: "Chef's special",
      },{
        id: 'nazaakat-pulao',
        name: 'Nazaakat Pulao',
        description: 'A delicate and aromatic vegetable pulao with mild seasoning.',
        price: 699,
        imageKey: 'nazaakatPulao',
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
        price: 1499,
        imageKey: 'dhanShikori',
        rating: 0,
        reviews: 0,
        popular: false,
        isNew: true,
        tag: 'New',
      },{
        id: 'masaledar-gosht-curry',
        name: 'Masaledar Gosht Curry',
        description: 'Fiery and flavorful mutton curry cooked in rich masala gravy.',
        price: 1499,
        imageKey: 'masaledarGosht',
        rating: 4.7,
        reviews: 56,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'boneless-tikka-masala',
        name: 'Boneless Tikka Masala',
        description: 'Tikka masala made with soft boneless chicken pieces.',
        price: 1049,
        imageKey: 'bonelessTikkaMasala',
        rating: 4.9,
        reviews: 76,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'murgh-angaara',
        name: 'Murgh Angaara',
        description: 'Smoky, spicy chicken curry with bold tandoori flavor.',
        price: 799,
        imageKey: 'murghAngaara',
        rating: 4.7,
        reviews: 78,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'shahi-murgh-korma',
        name: 'Shahi Murgh Korma',
        description: 'Rich and creamy chicken korma in traditional Mughlai style.',
        price: 799,
        imageKey: 'shahiMurghKorma',
        rating: 4.8,
        reviews: 92,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'masaledar-murgh',
        name: 'Masaledar Murgh',
        description: 'A robust chicken curry with strong, home-style spice punch.',
        price: 799,
        imageKey: 'masaledarMurgh',
        rating: 4.6,
        reviews: 65,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'murgh-tikka-masala',
        name: 'Murgh Tikka Masala',
        description: 'Classic tikka curry with a luscious gravy — rich and hearty.',
        price: 799,
        imageKey: 'murghTikkaMasala',
        rating: 4.8,
        reviews: 87,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'murgh-kolhapuri-e-zaiqa',
        name: 'Murgh Kolhapuri-e-Zaiqa',
        description: 'Spicy and rustic chicken curry from the heart of Kolhapur.',
        price: 799,
        imageKey: 'murghKolhapuri',
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
        imageKey: 'paneerTikkaMasala',
        rating: 4.6,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'kadhai-paneer-nawabi',
        name: 'Kadhai Paneer Nawabi',
        description: 'Chunky paneer tossed in kadhai-style spices with a royal finish.',
        price: 899,
        imageKey: 'kadhaiPaneer',
        rating: 4.5,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'paneer-e-firangi',
        name: 'Paneer-e-Firangi',
        description: 'Indo-fusion paneer curry with a creamy and lightly spiced twist',
        price: 899,
        imageKey: 'paneerFirangi',
        rating: 4.4,
        reviews: 38,
        popular: false,
        isNew: false,
        tag: '',
      },{
        id: 'sabziyon-ka-zaika',
        name: 'Sabziyon ka Zaika',
        description: 'A medley of seasonal vegetables in traditional Indian masala.',
        price: 799,
        imageKey: 'sabziyonZaika',
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
        imageKey: 'kebabRoyale',
        rating: 4.7,
        reviews: 89,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },{
        id: 'shahi-murgh-rolls',
        name: 'Shahi Murgh Rolls',
        description: 'Cheese‑filled chicken kebab roll, crispy‑fried and bursting with spice.',
        price: 599,
        imageKey: 'shahiMurghRolls',
        rating: 4.5,
        reviews: 67,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },{
        id: 'kebab-e-firangi',
        name: 'Kebab-e-Firangi',
        description: 'Creamy chicken-potato ovals coated in vermicelli and deep-fried crisp.',
        price: 549,
        imageKey: 'kebabFirangi',
        rating: 4.6,
        reviews: 54,
        popular: false,
        isNew: false,
        tag: '',
        unit: '12 pcs',
      },{
        id: 'tandoori-taaj-leg',
        name: 'Tandoori Taaj Leg',
        description: 'Large chicken leg marinated in royal tandoori spices and roasted.',
        price: 549,
        imageKey: 'tandooriTaaj',
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
  const [videoSrc, setVideoSrc] = useState<string | null>(chickenBiryaniVideoSrc);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Keyword mapping for intelligent search - maps user terms to menu terms
  const keywordMap: Record<string, string[]> = {
    chicken: ['murgh'],
    murgh: ['murgh'],
    mutton: ['gosht'],
    gosht: ['gosht'],
    lamb: ['gosht'],
    paneer: ['paneer'],
    veg: ['paneer', 'sabz', 'nawabi veg'],
    vegetarian: ['paneer', 'sabz', 'nawabi veg'],
    tikka: ['tikka'],
    biryani: ['biryani', 'dum'],
    kebab: ['kebab', 'seekh'],
    curry: ['curry', 'masala', 'korma'],
    korma: ['korma'],
    masala: ['masala'],
  };

  // Get all matching items for dropdown
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/);
    
    // Map each query word to its corresponding menu terms
    const mappedTerms = queryWords.map(word => {
      const mapped = keywordMap[word];
      return mapped ? mapped : [word];
    });
    
    const results: { item: typeof menuCategories[0]['items'][0]; category: string }[] = [];
    
    menuCategories.forEach(category => {
      category.items.forEach(item => {
        const itemText = `${item.name} ${item.description}`.toLowerCase();
        
        // Check if ALL query words match (either directly or via mapping)
        const allWordsMatch = mappedTerms.every(terms => 
          terms.some(term => itemText.includes(term))
        );
        
        if (allWordsMatch) {
          results.push({ item, category: category.name });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  // Filter menu categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return menuCategories;
    
    const matchingItemIds = new Set(searchResults.map(r => r.item.id));
    
    return menuCategories.map(category => ({
      ...category,
      items: category.items.filter(item => matchingItemIds.has(item.id))
    })).filter(category => category.items.length > 0);
  }, [searchQuery, searchResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectItem = (itemId: string) => {
    setShowDropdown(false);
    const element = document.getElementById(`menu-item-${itemId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  // Image loader for lazy menu items
  const loadImage = useCallback((key: string): Promise<{ default: string }> => {
    const loader = menuImages[key as keyof typeof menuImages];
    if (loader) return loader();
    return Promise.resolve({ default: '/placeholder.svg' });
  }, []);

  // Video is imported statically so it starts loading with the page bundle

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
      <Helmet>
        <title>Our Menu - Authentic Biryanis & Kebabs | Biryani Palace</title>
        <meta name="description" content="Browse 30+ biryanis, curries, kebabs and bulk event plans at Biryani Palace, Kalyan. Free delivery within Kalyan and easy WhatsApp ordering." />
        <link rel="canonical" href="https://biryanipalace.lovable.app/menu" />
        <meta property="og:title" content="Our Menu - Authentic Biryanis & Kebabs | Biryani Palace" />
        <meta property="og:description" content="Browse 30+ biryanis, curries, kebabs and bulk event plans at Biryani Palace, Kalyan." />
        <meta property="og:url" content="https://biryanipalace.lovable.app/menu" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          "name": "Biryani Palace Menu",
          "url": "https://biryanipalace.lovable.app/menu",
          "hasMenuSection": [
            { "@type": "MenuSection", "name": "Chicken Biryani", "hasMenuItem": [
              { "@type": "MenuItem", "name": "Hyderabadi Murgh Dum Biryani" },
              { "@type": "MenuItem", "name": "Alishaan Tandoori Biryani" },
              { "@type": "MenuItem", "name": "Lazzat-e-Tikka Biryani" }
            ]},
            { "@type": "MenuSection", "name": "Mutton Biryani", "hasMenuItem": [
              { "@type": "MenuItem", "name": "Hyderabadi Mutton Dum Biryani" },
              { "@type": "MenuItem", "name": "Gosht-e-Dum Mazedaar" }
            ]},
            { "@type": "MenuSection", "name": "Veg Biryani", "hasMenuItem": [
              { "@type": "MenuItem", "name": "Nawabi Veg Dum Biryani" },
              { "@type": "MenuItem", "name": "Paneer-e-Tikka Biryani" }
            ]},
            { "@type": "MenuSection", "name": "Kebabs & Curries", "hasMenuItem": [
              { "@type": "MenuItem", "name": "Kebab Royale Sticks" },
              { "@type": "MenuItem", "name": "Shahi Murgh Korma" }
            ]}
          ]
        })}</script>
      </Helmet>
      <Header />
      
      
        {/* Hero Video Section - Desktop Only (Optimized for Mobile) */}
        {videoSrc && !isMobile ? (
          <div className="relative mb-12 md:mb-20 -mt-4">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop
                preload="auto"
                playsInline
                className="w-full h-[50vh] md:h-[80vh] lg:h-[85vh] object-cover"
                style={{ 
                  objectPosition: 'center 65%',
                  transform: 'scale(1.05)',
                  transformOrigin: 'center 65%'
                }}
                poster={heroBiryani}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6 max-w-4xl mx-auto">
                    <h1 className="font-alata text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                      Our <span className="font-allura text-primary text-4xl md:text-7xl lg:text-8xl drop-shadow-lg">Royal Menu</span>
                    </h1>
                    <p className="font-montserrat text-sm md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                      Experience the authentic taste of royal biryani, crafted with premium ingredients 
                      and served fresh from our kitchen to your table
                    </p>
                  </div>
                </div>
                
                {/* Bottom Corner Badge */}
                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                  <div className="bg-primary/90 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                    <span className="text-white font-semibold text-xs md:text-sm flex items-center gap-1 md:gap-2">
                      <Crown className="w-3 h-3 md:w-4 md:h-4" />
                      Fresh & Hot Serving
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback Hero Image while video loads */
          <div className="relative mb-12 md:mb-20 -mt-4">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroBiryani}
                alt="Royal biryani menu"
                className="w-full h-[50vh] md:h-[80vh] object-cover"
                style={{ objectPosition: 'center 65%' }}
                width={1920}
                height={1080}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-6">
                    <h1 className="font-alata text-3xl md:text-6xl font-bold mb-4">
                      Our <span className="font-allura text-primary text-4xl md:text-7xl drop-shadow-lg">Royal Menu</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      <section id="menu" className="py-12 px-4" style={{ contain: 'layout style' }}>
        <div className="container mx-auto">
          
          {/* Search Bar & Download */}
          <div className="max-w-2xl mx-auto mb-12" ref={searchRef}>
            <div className="flex justify-end mb-3">
              <a
                href="/Biryani_Palace_Menu.pdf"
                download="Biryani_Palace_Menu.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-montserrat font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Menu PDF
              </a>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Input
                type="text"
                placeholder="Search menu... (try chicken, mutton, paneer, tikka)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="pl-12 pr-12 py-6 text-base font-montserrat bg-card border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery('');
                    setShowDropdown(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              {/* Search Dropdown */}
              {showDropdown && searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.slice(0, 10).map((result, index) => (
                    <button
                      key={`${result.item.id}-${index}`}
                      onClick={() => handleSelectItem(result.item.id)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent/50 transition-colors text-left border-b border-border/50 last:border-b-0"
                    >
                      <div className="flex-1">
                        <p className="font-montserrat font-medium text-foreground text-sm">
                          {result.item.name}
                        </p>
                        <p className="font-montserrat text-xs text-muted-foreground">
                          {result.category} • ₹{result.item.price}
                        </p>
                      </div>
                    </button>
                  ))}
                  {searchResults.length > 10 && (
                    <p className="px-4 py-2 text-xs text-muted-foreground text-center font-montserrat">
                      +{searchResults.length - 10} more items below
                    </p>
                  )}
                </div>
              )}
              
              {showDropdown && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 p-4 text-center">
                  <p className="font-montserrat text-sm text-muted-foreground">
                    No items found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Bucket Biryani Specials */}
          <div className="mb-20">
            <h2 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
              <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Bucket Biryani Specials</span>
            </h2>
            
            <Card className="bg-gradient-card border-2 border-primary/30 overflow-hidden max-w-6xl mx-auto">
              <CardContent className="p-4 sm:p-6 md:p-8">
                {/* Bucket Images Grid - Responsive */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {bucketBiryaniImages.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg aspect-square">
                      <img
                        src={image}
                        alt={`Bucket Biryani ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={300}
                        height={300}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 text-white text-xs font-semibold">
                          Steam Fresh
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="text-center mb-6">
                  <p className="font-montserrat text-sm sm:text-base md:text-lg text-foreground/80 mb-4">
                    "Introducing our royal Bucket Biryani — served hot and fresh in party-size buckets. Perfect for family feasts, celebrations, or a cozy weekend indulgence."
                  </p>
                  
                  {/* Pricing */}
                  <div className="text-center mb-4">
                    <div className="font-alata text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                      Starting from
                    </div>
                    <div className="flex flex-row justify-center gap-6 sm:gap-8">
                      <div className="text-center">
                        <div className="font-alata text-base sm:text-lg font-bold text-foreground">Half Kg</div>
                        <div className="font-montserrat text-primary font-semibold text-sm sm:text-base">₹599 onwards</div>
                      </div>
                      <div className="text-center">
                        <div className="font-alata text-base sm:text-lg font-bold text-foreground">Full Kg</div>
                        <div className="font-montserrat text-primary font-semibold text-sm sm:text-base">₹1,028 onwards</div>
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
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="mb-16">
                {/* Category Header */}
                <h3 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
                  <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>{category.name}</span>
                </h3>
                
                {/* Category Items Grid - 4 items per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item) => (
                    <LazyMenuItem
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      getTagColor={getTagColor}
                      imageLoader={loadImage}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : searchQuery ? (
            <div className="text-center py-16">
              <p className="font-montserrat text-lg text-muted-foreground mb-2">No items found for "{searchQuery}"</p>
              <p className="font-montserrat text-sm text-muted-foreground/70">Try searching for chicken, mutton, paneer, biryani, or tikka</p>
            </div>
          ) : null}

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