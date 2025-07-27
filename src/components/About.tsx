import { Award, Clock, Heart, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Made with Love",
      description: "Every dish is prepared with passion and traditional family recipes passed down through generations."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Premium Quality",
      description: "We use only the finest basmati rice, authentic spices, and fresh ingredients sourced daily."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Quick Service",
      description: "Fresh biryani delivered hot to your doorstep within 3 hours of ordering."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Family Focused",
      description: "Perfect portions and flavors crafted specifically for family dining and special occasions."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-alata text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="font-allura text-primary text-5xl md:text-6xl">Us</span>
            </h2>
            
            <div className="space-y-6 font-montserrat text-foreground/80 leading-relaxed">
              <p className="text-lg">
                Welcome to <span className="text-foreground font-semibold">Biryani Palace</span>, where 
                tradition meets taste in every grain of rice. For more than 4 years, we've been serving 
                authentic biryani that brings families together around the dinner table.
              </p>
              
              <p>
                We prepare dum pukht biryani on coal-based stoves, and our Ustaad has more than two decades of experience. 
                In every 1 kg biryani, we provide 1 kg rice and 1 kg chicken, ensuring the perfect balance and generous portions. 
                Each dish tells a story of heritage, craftsmanship, and the love for good food.
              </p>
              
              <p>
                We believe that great food should be accessible to everyone. That's why we've made it 
                easy to order our delicious biryani through WhatsApp, ensuring fresh, hot meals reach 
                your family quickly and conveniently.
              </p>
            </div>

            <div className="mt-8 bg-gradient-card border border-border rounded-xl p-6">
              <h3 className="font-alata text-xl font-bold text-foreground mb-3">Our Promise</h3>
              <p className="font-montserrat text-foreground/80">
                Every order is prepared fresh, never pre-cooked. We guarantee authentic taste, 
                quality ingredients, and the perfect balance of spices that makes our biryani special.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-smooth"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-alata text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-montserrat text-foreground/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "100+", label: "Happy Families" },
            { number: "4+", label: "Years Experience" },
            { number: "50+", label: "Daily Orders" },
            { number: "4.3", label: "Average Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-alata text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="font-montserrat text-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;