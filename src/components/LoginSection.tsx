import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Gift, Sparkles, CheckCircle2 } from 'lucide-react';

const LoginSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, isLoggedIn, user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consent: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to be contacted for updates and offers.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      toast({
        title: `Thanks for logging in, ${formData.name.split(' ')[0]}!`,
        description: "You now have access to exclusive offers and personalized experience!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        consent: false
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show welcome message if user is logged in
  if (isLoggedIn && user) {
    return (
      <section id="login" className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-card border-border shadow-elegant">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500/10 p-4 rounded-full">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                <h3 className="font-alata text-2xl font-bold text-foreground mb-4">
                  Welcome back, {user.name.split(' ')[0]}!
                </h3>
                <p className="font-montserrat text-foreground/80 mb-6">
                  You're all set to enjoy exclusive offers and personalized biryani recommendations.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <p className="font-montserrat text-sm text-primary font-semibold">
                    🎉 Your exclusive 10% discount is active!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="login" className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-card border-border shadow-elegant">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Gift className="w-8 h-8 text-primary" />
                </div>
              </div>
              <CardTitle className="font-alata text-3xl font-bold text-foreground mb-2">
                Login to Unlock 
                <span className="font-allura text-primary text-4xl ml-2" style={{textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'}}>
                  Offers
                </span>
              </CardTitle>
              <p className="font-montserrat text-foreground/80 leading-relaxed">
                Sign in to get access to exclusive biryani offers, special discounts, and early menu updates.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-montserrat font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="font-montserrat border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-montserrat font-medium text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="font-montserrat border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-montserrat font-medium text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="font-montserrat border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleConsentChange}
                    className="mt-1"
                  />
                  <Label 
                    htmlFor="consent" 
                    className="font-montserrat text-sm text-foreground/80 leading-relaxed cursor-pointer"
                  >
                    I agree to be contacted via WhatsApp for updates and offers.
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold py-6 text-lg glow-gold transition-smooth mt-6"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Continue</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="font-montserrat text-xs text-foreground/70">
                  🎯 Get instant access to 10% off your first order!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;