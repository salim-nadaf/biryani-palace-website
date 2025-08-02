import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      details: "+91 91676 82582",
      action: () => window.open('tel:+919167682582'),
      buttonText: "Call Now"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "WhatsApp",
      details: "+91 91676 82582",
      action: () => window.open('https://wa.me/919167682582?text=Hi! I would like to place an order.', '_blank'),
      buttonText: "Message Us"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Location",
      details: "Raunak City, Kalyan-West, Maharashtra, 421301",
      action: null,
      buttonText: null
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Hours",
      details: "Mon-Sun: 12 PM - 10 PM (Fri: 4 PM - 10 PM)",
      action: null,
      buttonText: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-alata text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact <span className="font-allura text-primary text-5xl md:text-6xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Us</span>
          </h2>
          <p className="font-montserrat text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to satisfy your biryani cravings? Get in touch with us for orders, 
            queries, or special requests.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:border-primary/50 transition-smooth">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="font-alata text-lg font-bold text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="font-montserrat text-foreground/70 mb-4 text-sm">
                  {info.details}
                </p>
                {info.action && info.buttonText && (
                  <Button
                    onClick={info.action}
                    variant="outline"
                    size="sm"
                    className="border-primary/50 text-foreground hover:bg-primary/10 font-montserrat"
                  >
                    {info.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Order Section */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8 text-center">
          <h3 className="font-alata text-2xl font-bold text-foreground mb-4">
            Ready to <span className="font-allura text-primary text-3xl" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>Order?</span>
          </h3>
          <p className="font-montserrat text-foreground/80 mb-6 max-w-2xl mx-auto">
            Skip the wait! Order directly through WhatsApp for the fastest service. 
            Our team will confirm your order and provide delivery details within minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.open('https://wa.me/919167682582?text=Hi! I would like to place an order from the menu.', '_blank')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold glow-gold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order via WhatsApp
            </Button>
            
            <Button
              onClick={() => window.open('tel:+919167682582')}
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 font-montserrat font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call to Order
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-montserrat text-foreground/70">
            <div>📱 Quick WhatsApp ordering</div>
            <div>🚚 Free delivery within Kalyan</div>
            <div>💰 Cash/UPI on delivery available</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="font-montserrat text-foreground/60 text-sm">
            © 2025 Biryani Palace. Made with ❤️ for biryani lovers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;