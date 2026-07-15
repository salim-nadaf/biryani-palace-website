import { Plus, Star, Users, Crown, Utensils, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import LazyImage from './LazyImage';

// Import all the new images
import alishaanTandooriBiryani from '@/assets/alishaan-tandoori-biryani.webp';
import lababdaarSeekhBiryani from '@/assets/lababdaar-seekh-biryani.webp';
import lazzatETikkaBiryani from '@/assets/lazzat-e-tikka-biryani.webp';
import bonelessLazzatETikkaBiryani from '@/assets/boneless-lazzat-e-tikka-biryani.webp';
import makhmaliBiryani from '@/assets/makhmali-malai-biryani.webp';
import nayaabiItalianoBiryani from '@/assets/nayaabi-italiano-biryani.webp';
import zamZamLazawaabBiryani from '@/assets/zam-zam-lazawaab-biryani.webp';
import banjaraEBiryani from '@/assets/banjara-e-biryani.webp';
import ustaadiMurghDum from '@/assets/ustaadi-murgh-dum.webp';
import goshtEDumMazedaar from '@/assets/gosht-e-dum-mazedaar.webp';
import hyderabadiMurghDum from '@/assets/hyderabadi-murgh-dum.webp';
import hyderabadiMuttonDum from '@/assets/hyderabadi-mutton-dum.webp';
import nawabiVegDumBiryani from '@/assets/nawabi-veg-dum-biryani.webp';
import sabzTikkaBiryani from '@/assets/sabz-tikka-biryani.webp';
import paneerETikkaBiryani from '@/assets/paneer-e-tikka-biryani.webp';
import nazaakatPulao from '@/assets/nazaakat-pulao.webp';
import kebabRoyaleSticks from '@/assets/kebab-royale-sticks.webp';
import tandooriTaajLeg from '@/assets/tandoori-taaj-leg.webp';
import kebabEFirangi from '@/assets/kebab-e-firangi.webp';
import shahiMurghRolls from '@/assets/shahi-murgh-rolls.webp';
import murghAngaara from '@/assets/murgh-angaara.webp';
import shahiMurghKorma from '@/assets/shahi-murgh-korma.webp';
import masaledarMurgh from '@/assets/masaledar-murgh.webp';
import murghTikkaMasala from '@/assets/murgh-tikka-masala.webp';
import bonelessTikkaMasala from '@/assets/boneless-tikka-masala.webp';
import murghKolhapuriEZaiqa from '@/assets/murgh-kolhapuri-e-zaiqa.webp';
import dhanEShikoriGosht from '@/assets/dhan-e-shikori-gosht.webp';
import masaledarGoshtCurry from '@/assets/masaledar-gosht-curry.webp';
import sabziyonKaZaika from '@/assets/sabziyon-ka-zaika.webp';
import paneerETikkaMasala from '@/assets/paneer-e-tikka-masala.webp';
import kadhaiPaneerNawabi from '@/assets/kadhai-paneer-nawabi.webp';
import paneerEFirangi from '@/assets/paneer-e-firangi.webp';

// Bucket images
import chickenDumBucket1kg from '@/assets/chicken-dum-bucket-1kg.webp';
import chickenDumBucket from '@/assets/chicken-dum-bucket.webp';
import chickenTandoorBucket1kg from '@/assets/chicken-tandoor-bucket-1kg.webp';
import chickenTandooriBucket from '@/assets/chicken-tandoori-bucket.webp';

// Video
import chickenBiryaniVideo from '@/assets/chicken-biryani-serving.mp4';

// Fallback images
import chickenBiryani from '@/assets/chicken-biryani.jpg';
import muttonBiryani from '@/assets/mutton-biryani.jpg';
import vegBiryani from '@/assets/veg-biryani.jpg';

// Bulk Order Plans
const bulkOrderPlans = [{
    id: 'royal-baithak',
    name: 'The Royal Baithak',
    guests: '40–50 Guests',
    quantity: '15 KG Total',
    items: 'Choose 3 Biryanis + 3 Gravies + Starters',
    freebie: 'Free Dessert + Drinks + Salad',
    price: 13999,
    popular: false,
  },{
    id: 'shaahi-dawat',
    name: 'The Shaahi Dawat',
    guests: '20–30 Guests',
    quantity: '10 KG Total',
    items: '2 Biryani Flavors + 2 Gravies + Starters',
    freebie: 'Free Gulab Jamun or Soft Drink',
    price: 8999,
    popular: true,
  },
  {
    id: 'mehmaan-plan',
    name: 'The Mehmaan Plan',
    guests: '10–15 Guests',
    quantity: '5 KG Total',
    items: 'Biryani + Starter + Gravy',
    freebie: 'Free Gulab Jamun (10 pcs)',
    price: 4499,
    popular: false,
  },
];

// Bucket Biryani Special Items
const bucketSpecialItems = [
  {
    id: 'chicken-dum-bucket-1kg',
    name: 'Chicken Dum Bucket (1 KG)',
    description: 'Premium chicken dum biryani served in a special bucket for sharing.',
    price: 1028,
    image: chickenDumBucket1kg,
    popular: true,
  },{
    id: 'chicken-tandoor-bucket-1kg',
    name: 'Chicken Tandoor Bucket (1 KG)',
    description: 'Tandoori chicken biryani with smoky flavors in a convenient bucket.',
    price: 1028,
    image: chickenTandoorBucket1kg,
    popular: false,
  },{
    id: 'chicken-dum-bucket',
    name: 'Chicken Dum Bucket',
    description: 'Delicious chicken dum biryani in our signature bucket serving.',
    price: 599,
    image: chickenDumBucket,
    popular: false,
  },{
    id: 'chicken-tandoori-bucket',
    name: 'Chicken Tandoori Bucket',
    description: 'Traditional tandoori chicken biryani served in our special bucket.',
    price: 599,
    image: chickenTandooriBucket,
    popular: false,
  },
];

const menuCategories = [
  {
    id: 'crowned-flavours',
    name: 'Crowned Flavours',
    items: [{
        id: 'lababdaar-seekh-biryani',
        name: 'Lababdaar Seekh Biryani',
        description: 'Succulent seekh kebabs layered with aromatic basmati rice and traditional spices for a royal feast.',
        price: 1299,
        image: lababdaarSeekhBiryani,
        rating: 4.8,
        reviews: 203,
        popular: false,
        isNew: false,
      },{
        id: 'boneless-lazzat-e-tikka-biryani',
        name: 'Boneless Lazzat-e-Tikka Biryani',
        description: 'Premium boneless chicken tikka with aromatic basmati rice and signature spice blend.',
        price: 1299,
        image: bonelessLazzatETikkaBiryani,
        rating: 4.9,
        reviews: 87,
        popular: false,
        isNew: false,
      },
      {
        id: 'alishaan-tandoori-biryani',
        name: 'Alishaan Tandoori Biryani',
        description: 'Royal tandoori chicken marinated in exotic spices, layered with premium basmati rice and slow-cooked to perfection.',
        price: 1099,
        image: alishaanTandooriBiryani,
        rating: 4.9,
        reviews: 156,
        popular: true,
        isNew: false,
      },{
        id: 'lazzat-e-tikka-biryani',
        name: 'Lazzat-e-Tikka Biryani',
        description: 'Smoky chicken tikka pieces with fragrant basmati rice, infused with royal spices and saffron.',
        price: 1099,
        image: lazzatETikkaBiryani,
        rating: 4.7,
        reviews: 124,
        popular: false,
        isNew: false,
      },
    ]
  },
  {
    id: 'biryani-reimagined',
    name: 'Biryani Reimagined',
    items: [{
        id: 'zam-zam-lazawaab-biryani',
        name: 'Zam-Zam Lazawaab Biryani',
        description: 'An exquisite blend of Middle Eastern spices with traditional biryani preparation.',
        price: 1899,
        image: zamZamLazawaabBiryani,
        rating: 4.8,
        reviews: 78,
        popular: false,
        isNew: false,
      },{
        id: 'nayaabi-italiano-biryani',
        name: 'Nayaabi Italiano Biryani',
        description: 'A fusion masterpiece combining Italian herbs with traditional biryani flavors.',
        price: 1299,
        image: nayaabiItalianoBiryani,
        rating: 4.6,
        reviews: 45,
        popular: false,
        isNew: true,
      },
      {
        id: 'makhmali-malai-biryani',
        name: 'Makhmali Malai Biryani',
        description: 'Creamy and rich chicken malai biryani with cashews and cream, a royal delicacy.',
        price: 1199,
        image: makhmaliBiryani,
        rating: 5.0,
        reviews: 67,
        popular: true,
        isNew: false,
      },{
        id: 'banjara-e-biryani',
        name: 'Banjara-e-Biryani',
        description: 'Traditional nomadic style biryani with wild spices and rustic flavors.',
        price: 1099,
        image: banjaraEBiryani,
        rating: 4.7,
        reviews: 89,
        popular: false,
        isNew: false,
      },
    ]
  },
  {
    id: 'traditional-dum-biryanis',
    name: 'Traditional Dum Biryanis',
    items: [{
        id: 'hyderabadi-mutton-dum',
        name: 'Hyderabadi Mutton Dum',
        description: 'Traditional Hyderabadi mutton biryani with aromatic spices and tender meat.',
        price: 1899,
        image: hyderabadiMuttonDum,
        rating: 5.0,
        reviews: 98,
        popular: false,
        isNew: false,
      },{
        id: 'gosht-e-dum-mazedaar',
        name: 'Gosht-e-Dum Mazedaar',
        description: 'Slow-cooked mutton with traditional spices, layered with premium basmati rice.',
        price: 1599,
        image: goshtEDumMazedaar,
        rating: 4.9,
        reviews: 167,
        popular: true,
        isNew: false,
      },{
        id: 'hyderabadi-murgh-dum',
        name: 'Hyderabadi Murgh Dum',
        description: 'Authentic Hyderabadi style chicken biryani with saffron and royal spices.',
        price: 1099,
        image: hyderabadiMurghDum,
        rating: 4.7,
        reviews: 134,
        popular: false,
        isNew: false,
      },
      {
        id: 'ustaadi-murgh-dum',
        name: 'Ustaadi Murgh Dum',
        description: 'Master chef\'s special chicken dum biryani, slow-cooked with traditional techniques.',
        price: 999,
        image: ustaadiMurghDum,
        rating: 4.8,
        reviews: 145,
        popular: true,
        isNew: false,
      },
    ]
  },
  {
    id: 'vegetarian-royalty',
    name: 'Vegetarian Royalty',
    items: [{
        id: 'paneer-e-tikka-biryani',
        name: 'Paneer-e-Tikka Biryani',
        description: 'Grilled paneer tikka with fragrant rice, nuts, and aromatic spices.',
        price: 1199,
        image: paneerETikkaBiryani,
        rating: 4.6,
        reviews: 98,
        popular: false,
        isNew: false,
      },{
        id: 'sabz-tikka-biryani',
        name: 'Sabz Tikka Biryani',
        description: 'Grilled vegetable tikka with fragrant basmati rice and exotic spices.',
        price: 899,
        image: sabzTikkaBiryani,
        rating: 4.4,
        reviews: 54,
        popular: false,
        isNew: false,
      },
      {
        id: 'nawabi-veg-dum-biryani',
        name: 'Nawabi Veg Dum Biryani',
        description: 'Royal vegetable biryani with premium vegetables and aromatic spices.',
        price: 849,
        image: nawabiVegDumBiryani,
        rating: 4.5,
        reviews: 76,
        popular: true,
        isNew: false,
      },{
        id: 'shahi-paneer-dum-biryani',
        name: 'Shahi Paneer Dum Biryani',
        description: 'Rich paneer biryani with royal spices and creamy texture.',
        price: 849,
        image: vegBiryani,
        rating: 4.6,
        reviews: 67,
        popular: false,
        isNew: false,
      },{
        id: 'zam-zam-mehekti-pulao',
        name: 'Zam-Zam Mehekti Pulao',
        description: 'Fragrant pulao with exotic spices and premium basmati rice.',
        price: 599,
        image: vegBiryani,
        rating: 4.4,
        reviews: 38,
        popular: false,
        isNew: false,
      },{
        id: 'nazaakat-pulao',
        name: 'Nazaakat Pulao',
        description: 'Delicate and aromatic pulao with mixed vegetables and mild spices.',
        price: 549,
        image: nazaakatPulao,
        rating: 4.3,
        reviews: 43,
        popular: false,
        isNew: false,
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
        description: 'Premium seekh kebabs grilled to perfection with royal spices.',
        price: 599,
        image: kebabRoyaleSticks,
        rating: 4.7,
        reviews: 89,
        popular: true,
        isNew: false,
      },{
        id: 'shahi-murgh-rolls',
        name: 'Shahi Murgh Rolls',
        description: 'Royal chicken rolls wrapped in soft bread with aromatic fillings.',
        price: 599,
        image: shahiMurghRolls,
        rating: 4.5,
        reviews: 67,
        popular: false,
        isNew: false,
      },{
        id: 'tandoori-taaj-leg',
        name: 'Tandoori Taaj Leg',
        description: 'Succulent chicken leg pieces marinated in tandoori spices.',
        price: 549,
        image: tandooriTaajLeg,
        rating: 4.8,
        reviews: 76,
        popular: false,
        isNew: false,
      },{
        id: 'kebab-e-firangi',
        name: 'Kebab-e-Firangi',
        description: 'Fusion kebabs with international flavors and local spices.',
        price: 549,
        image: kebabEFirangi,
        rating: 4.6,
        reviews: 54,
        popular: false,
        isNew: true,
      },
    ]
  },
  {
    id: 'curries-gravies',
    name: 'Curries & Gravies',
    items: [{
        id: 'dhan-e-shikori-gosht',
        name: 'Dhan-e-Shikori Gosht',
        description: 'Rich mutton curry with hunting-style spices and herbs.',
        price: 1499,
        image: dhanEShikoriGosht,
        rating: 4.8,
        reviews: 45,
        popular: false,
        isNew: false,
      },{
        id: 'masaledar-gosht-curry',
        name: 'Masaledar Gosht Curry',
        description: 'Traditional mutton curry with aromatic spices and rich gravy.',
        price: 1499,
        image: masaledarGoshtCurry,
        rating: 4.7,
        reviews: 56,
        popular: false,
        isNew: false,
      },{
        id: 'boneless-tikka-masala',
        name: 'Boneless Tikka Masala',
        description: 'Premium boneless chicken in rich tikka masala gravy.',
        price: 1049,
        image: bonelessTikkaMasala,
        rating: 4.9,
        reviews: 76,
        popular: false,
        isNew: false,
      },
      {
        id: 'murgh-angaara',
        name: 'Murgh Angaara',
        description: 'Fiery chicken curry with bold spices and rich gravy.',
        price: 799,
        image: murghAngaara,
        rating: 4.7,
        reviews: 78,
        popular: true,
        isNew: false,
      },{
        id: 'shahi-murgh-korma',
        name: 'Shahi Murgh Korma',
        description: 'Rich and creamy chicken korma with royal spices and nuts.',
        price: 799,
        image: shahiMurghKorma,
        rating: 4.8,
        reviews: 92,
        popular: false,
        isNew: false,
      },{
        id: 'masaledar-murgh',
        name: 'Masaledar Murgh',
        description: 'Spicy chicken curry with traditional masala blend.',
        price: 799,
        image: masaledarMurgh,
        rating: 4.6,
        reviews: 65,
        popular: false,
        isNew: false,
      },{
        id: 'murgh-tikka-masala',
        name: 'Murgh Tikka Masala',
        description: 'Creamy tomato-based curry with grilled chicken tikka pieces.',
        price: 799,
        image: murghTikkaMasala,
        rating: 4.8,
        reviews: 87,
        popular: false,
        isNew: false,
      },{
        id: 'murgh-kolhapuri-e-zaiqa',
        name: 'Murgh Kolhapuri-e-Zaiqa',
        description: 'Spicy Kolhapuri-style chicken curry with authentic flavors.',
        price: 799,
        image: murghKolhapuriEZaiqa,
        rating: 4.7,
        reviews: 58,
        popular: false,
        isNew: false,
      },
    ]
  },
  {
    id: 'palace-veg-delights',
    name: 'Palace Veg Delights',
    items: [{
        id: 'paneer-e-tikka-masala',
        name: 'Paneer-e-Tikka Masala',
        description: 'Grilled paneer in rich tomato-based masala gravy.',
        price: 899,
        image: paneerETikkaMasala,
        rating: 4.6,
        reviews: 67,
        popular: false,
        isNew: false,
      },{
        id: 'kadhai-paneer-nawabi',
        name: 'Kadhai Paneer Nawabi',
        description: 'Royal-style kadhai paneer with bell peppers and onions.',
        price: 899,
        image: kadhaiPaneerNawabi,
        rating: 4.5,
        reviews: 54,
        popular: false,
        isNew: false,
      },{
        id: 'paneer-e-firangi',
        name: 'Paneer-e-Firangi',
        description: 'Fusion paneer dish with international flavors and local spices.',
        price: 899,
        image: paneerEFirangi,
        rating: 4.4,
        reviews: 38,
        popular: false,
        isNew: true,
      },
      {
        id: 'sabziyon-ka-zaika',
        name: 'Sabziyon ka Zaika',
        description: 'Mixed vegetable curry with royal spices and aromatic gravy.',
        price: 799,
        image: sabziyonKaZaika,
        rating: 4.4,
        reviews: 43,
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

  const handleBulkOrderContact = (plan: any) => {
    const message = `Hi! I'm interested in ${plan.name} for ${plan.guests}. Can you provide more details?`;
    window.open(`https://wa.me/919167682582?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBucketContact = () => {
    const message = "Hi! I'm interested in your Bucket Biryani Special. Can you check availability?";
    window.open(`https://wa.me/919167682582?text=${encodeURIComponent(message)}`, '_blank');
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

        {/* Bucket Biryani Special Section */}
        <div className="mb-20">
          <h3 className="font-alata text-3xl font-bold text-foreground mb-8 text-center">
            <span className="font-allura text-primary text-4xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Bucket Biryani Special</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video Section */}
            <div className="order-1 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-card border border-border h-full">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster={chickenBiryani}
                  style={{ minHeight: '300px', maxHeight: '400px' }}
                >
                  <source src={chickenBiryaniVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Bucket Items Grid */}
            <div className="order-2 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {bucketSpecialItems.map((item) => (
                  <Card key={item.id} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth group overflow-hidden">
                    <div className="relative">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 object-cover group-hover:scale-105 transition-smooth"
                      />
                      {item.popular && (
                        <div className="absolute top-1 left-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                          Popular
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-3">
                      <div className="mb-2">
                        <h4 className="font-alata text-sm font-bold text-foreground leading-tight mb-1">
                          {item.name}
                        </h4>
                        <span className="font-alata text-base font-bold text-primary">
                          Starting from ₹{item.price}
                        </span>
                      </div>
                      
                      <p className="font-montserrat text-muted-foreground mb-3 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold transition-smooth glow-gold text-xs"
                        size="sm"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Check Availability Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={handleBucketContact}
                  className="w-full sm:w-auto bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/30 font-montserrat font-semibold transition-smooth"
                  size="lg"
                >
                  Check Availability on WhatsApp
                </Button>
              </div>
            </div>
          </div>
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
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="text-sm text-primary font-montserrat font-medium uppercase tracking-wide bg-primary/10 px-4 py-2 rounded-full shadow-sm border border-primary/20">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-6 text-center">
                  <h4 className="font-alata text-2xl font-bold text-foreground mb-4 mt-8">
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
                <Card key={item.id} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth group overflow-hidden">
                  <div className="relative">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-smooth"
                    />
                    {item.popular && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        Popular
                      </div>
                    )}
                     {item.isNew && (
                       <div className="absolute top-2 left-2 bg-green-800 text-white px-2 py-1 rounded-full text-xs font-montserrat font-bold shadow-lg border border-green-700">
                         New
                       </div>
                     )}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-foreground text-xs font-montserrat font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="mb-2">
                      <h4 className="font-alata text-base font-bold text-foreground leading-tight mb-1">
                        {item.name}
                      </h4>
                      <span className="font-alata text-lg font-bold text-primary">
                        ₹{item.price}
                      </span>
                    </div>
                    
                     <p className="font-montserrat text-muted-foreground mb-3 text-xs leading-relaxed line-clamp-2">
                       {item.description}
                     </p>
                    
                    <div className="flex items-center justify-between mb-3">
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
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold transition-smooth glow-gold"
                      size="sm"
                    >
                      <Plus className="mr-1 h-3 w-3" />
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