import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  Crown,
  MessageCircle,
  UtensilsCrossed,
} from 'lucide-react';
import Header from '@/components/Header';
import BiryaniCalculator from '@/components/BiryaniCalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  APPETITE_OPTIONS,
  EVENT_TYPES,
  type AppetiteLevel,
  type EventType,
} from '@/utils/calculatorLogic';

const PAGE_TITLE =
  'Biryani Quantity Calculator | Plan Your Event | Biryani Palace';
const PAGE_DESCRIPTION =
  'Free biryani quantity calculator for parties, weddings & family gatherings. Calculate how much biryani to order and get a WhatsApp quote from Biryani Palace, Kalyan.';

function parseEventType(value: string | null): EventType | '' {
  if (!value) return '';
  return EVENT_TYPES.includes(value as EventType) ? (value as EventType) : '';
}

function parseAppetite(value: string | null): AppetiteLevel | '' {
  if (!value) return '';
  return APPETITE_OPTIONS.some((o) => o.value === value)
    ? (value as AppetiteLevel)
    : '';
}

const CalculatorPage = () => {
  const [searchParams] = useSearchParams();

  const defaults = useMemo(
    () => ({
      guests: searchParams.get('guests') ?? '',
      eventType: parseEventType(searchParams.get('event')),
      appetite: parseAppetite(searchParams.get('appetite')),
    }),
    [searchParams]
  );

  useEffect(() => {
    document.title = PAGE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION);
    return () => {
      document.title = 'Biryani Palace - Biryani Quantity Calculator & Best Biryani in Kalyan';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Compact hero — focused, not a duplicate of homepage */}
      <section className="pt-28 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Calculator className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="font-alata text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            🧮 Biryani Quantity{' '}
            <span
              className="font-allura text-primary text-4xl sm:text-5xl md:text-6xl"
              style={{
                textShadow:
                  '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
              }}
            >
              Calculator
            </span>
          </h1>
          <p className="font-montserrat text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
            Not sure how much biryani to order? Calculate the perfect quantity
            for your gathering in seconds — then message us on WhatsApp to
            confirm your order.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-montserrat text-muted-foreground">
            <span>✓ Trusted by 100+ families in Kalyan</span>
            <span>✓ Bulk plans from ₹4,499</span>
            <span>✓ Free delivery in Kalyan</span>
          </div>
        </div>
      </section>

      <main>
        <BiryaniCalculator
          showHeader={false}
          showSeoContent
          defaultGuests={defaults.guests}
          defaultEventType={defaults.eventType}
          defaultAppetite={defaults.appetite}
          analyticsSource="calculator_page"
          className="pt-0"
        />

        {/* Keep visitors in the funnel — don't let them bounce after calculating */}
        <section className="py-16 px-4 border-t border-border/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-alata text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
              Ready for the{' '}
              <span className="font-allura text-primary text-3xl md:text-4xl">
                Next Step?
              </span>
            </h2>
            <p className="font-montserrat text-center text-foreground/75 mb-10 max-w-xl mx-auto">
              Explore our full menu, bulk event packages, or chat with us —
              we&apos;re here to make your event unforgettable.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card className="bg-gradient-card border-border hover:border-primary/40 transition-smooth group">
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <UtensilsCrossed
                    className="w-8 h-8 text-primary mx-auto mb-3"
                    aria-hidden="true"
                  />
                  <h3 className="font-alata text-lg font-bold text-foreground mb-2">
                    Full Menu
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground mb-4 flex-1">
                    30+ biryanis, gravies, kebabs &amp; bulk plans for every
                    budget.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 font-montserrat w-full"
                  >
                    <Link to="/menu">
                      View Menu
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-2 border-primary/30 hover:border-primary/50 transition-smooth group shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <Crown
                    className="w-8 h-8 text-primary mx-auto mb-3"
                    aria-hidden="true"
                  />
                  <h3 className="font-alata text-lg font-bold text-foreground mb-2">
                    Bulk Event Plans
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground mb-4 flex-1">
                    Weddings &amp; parties from 10–50 guests with free dessert
                    &amp; special pricing.
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat w-full glow-gold"
                  >
                    <Link to="/menu">
                      See Bulk Plans
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border hover:border-primary/40 transition-smooth group">
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <MessageCircle
                    className="w-8 h-8 text-[#25D366] mx-auto mb-3"
                    aria-hidden="true"
                  />
                  <h3 className="font-alata text-lg font-bold text-foreground mb-2">
                    Quick Enquiry
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground mb-4 flex-1">
                    Have questions? Message us directly — we reply fast on
                    WhatsApp.
                  </p>
                  <Button
                    asChild
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat w-full"
                  >
                    <a
                      href="https://wa.me/919167682582?text=Hi%20Biryani%20Palace!%20I%20used%20your%20Biryani%20Quantity%20Calculator%20and%20have%20a%20question."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="font-montserrat text-center text-sm text-muted-foreground mt-10">
              <Link to="/" className="text-primary hover:underline">
                ← Back to Biryani Palace Home
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CalculatorPage;
