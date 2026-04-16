import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeSection = () => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <section className="py-8 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-card border-border shadow-elegant">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h3 className="font-alata text-xl font-bold text-foreground mb-2">
                Welcome, {user.name.split(' ')[0]}!
              </h3>
              <p className="font-montserrat text-foreground/80 text-sm mb-4">
                You're all set to enjoy exclusive offers and personalized biryani recommendations.
              </p>
              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                <p className="font-montserrat text-xs text-primary font-semibold">
                  🎉 Your flat ₹100 off on 1 KG+ orders is active!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;