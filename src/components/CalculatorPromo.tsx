import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Calculator,
  Crown,
  PartyPopper,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  calculateBiryaniQuantity,
  formatKg,
  type AppetiteLevel,
  type EventType,
} from '@/utils/calculatorLogic';

const SCENARIOS: {
  icon: ReactNode;
  title: string;
  guests: number;
  event: EventType;
  appetite: AppetiteLevel;
  tagline: string;
}[] = [
  {
    icon: <Users className="w-6 h-6 text-primary" aria-hidden="true" />,
    title: 'Family Gathering',
    guests: 15,
    event: 'Family Gathering',
    appetite: 'normal',
    tagline: 'Sunday lunch, relatives over',
  },
  {
    icon: <PartyPopper className="w-6 h-6 text-primary" aria-hidden="true" />,
    title: 'Party',
    guests: 30,
    event: 'Party',
    appetite: 'normal',
    tagline: 'Birthdays, celebrations & get-togethers',
  },
  {
    icon: <Crown className="w-6 h-6 text-primary" aria-hidden="true" />,
    title: 'Wedding',
    guests: 50,
    event: 'Wedding',
    appetite: 'heavy',
    tagline: 'Large feasts with bulk discounts',
  },
];

const buildCalculatorLink = (
  guests: number,
  event: EventType,
  appetite: AppetiteLevel
) => {
  const params = new URLSearchParams({
    guests: String(guests),
    event,
    appetite,
  });
  return `/biryani-calculator?${params.toString()}`;
};

const CalculatorPromo = () => {
  return (
    <section
      id="biryani-calculator"
      className="py-20 px-4 bg-gradient-subtle scroll-mt-24"
      aria-labelledby="calculator-promo-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-5">
            <Calculator className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-montserrat text-sm text-primary font-semibold">
              Free Event Planning Tool
            </span>
          </div>
          <h2
            id="calculator-promo-heading"
            className="font-alata text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Hosting an Event?{' '}
            <span
              className="font-allura text-primary text-4xl sm:text-5xl md:text-6xl"
              style={{
                textShadow:
                  '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
              }}
            >
              Don&apos;t Guess.
            </span>
          </h2>
          <p className="font-montserrat text-lg text-foreground/80 max-w-2xl mx-auto">
            Calculate the perfect biryani quantity in 30 seconds — then order
            directly on WhatsApp with zero guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {SCENARIOS.map((scenario) => {
            const qty = formatKg(
              calculateBiryaniQuantity(scenario.guests, scenario.appetite)
                .suggestedOrder
            );
            return (
              <Link
                key={scenario.title}
                to={buildCalculatorLink(
                  scenario.guests,
                  scenario.event,
                  scenario.appetite
                )}
                className="group"
              >
                <Card className="h-full bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--primary)/0.15)]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        {scenario.icon}
                      </div>
                      <div>
                        <h3 className="font-alata text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {scenario.title}
                        </h3>
                        <p className="font-montserrat text-xs text-muted-foreground">
                          {scenario.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-montserrat text-sm text-muted-foreground">
                          {scenario.guests} guests
                        </p>
                        <p className="font-alata text-2xl font-bold text-primary mt-1">
                          ≈ {qty} KG
                        </p>
                      </div>
                      <ArrowRight
                        className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold h-14 px-10 text-base glow-gold"
            size="lg"
          >
            <Link to="/biryani-calculator">
              <Calculator className="w-5 h-5 mr-2" aria-hidden="true" />
              Open Biryani Calculator
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/10 font-montserrat h-14 px-8"
            size="lg"
          >
            <Link to="/menu">
              <UtensilsCrossed className="w-5 h-5 mr-2" aria-hidden="true" />
              Browse Full Menu
            </Link>
          </Button>
        </div>

        <p className="font-montserrat text-center text-sm text-muted-foreground mt-6">
          Free · No signup · Bulk discounts for weddings &amp; large parties
        </p>
      </div>
    </section>
  );
};

export default CalculatorPromo;
