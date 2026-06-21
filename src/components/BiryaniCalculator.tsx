import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Calculator,
  CheckCircle2,
  MessageCircle,
  Scale,
  Shield,
  Sparkles,
  Users,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CALCULATOR_DEFAULTS } from '@/config/calculatorPricing';
import {
  APPETITE_OPTIONS,
  EVENT_TYPES,
  type AppetiteLevel,
  type EventType,
  calculateBiryaniQuantity,
  formatKg,
} from '@/utils/calculatorLogic';
import { ANALYTICS_EVENTS, trackEvent } from '@/utils/analytics';

const WHATSAPP_NUMBER = '919167682582';

const TRUST_BADGES = [
  'Accurate quantity estimation',
  'Avoid food wastage',
  'Perfect for family gatherings',
  'Used for parties and events',
];

const SEO_FAQ = [
  {
    question: 'How much biryani per person?',
    answer:
      'For light eaters, plan 1 KG for 8 people. For normal appetite, 1 KG serves 7 people. For heavy eaters or biryani lovers, 1 KG serves 6 people.',
  },
  {
    question: 'How much biryani for a party?',
    answer:
      'Use our Biryani Quantity Calculator — enter your guest count and appetite level to get a suggested order with a 10% safety buffer, rounded to the nearest half kilogram.',
  },
  {
    question: 'How much biryani for a wedding?',
    answer:
      'Weddings typically need larger quantities with mixed appetites. Select "Wedding" as your event type, enter total guests, and choose Normal or Heavy appetite for a reliable estimate.',
  },
  {
    question: 'Is there a biryani quantity calculator for India?',
    answer:
      'Yes — Biryani Palace offers a free biryani quantity calculator tailored for Indian gatherings, events, and bulk orders in Kalyan and beyond.',
  },
];

export interface BiryaniCalculatorProps {
  showSeoContent?: boolean;
  showHeader?: boolean;
  defaultGuests?: string;
  defaultEventType?: EventType | '';
  defaultAppetite?: AppetiteLevel | '';
  analyticsSource?: string;
  className?: string;
}

const BiryaniCalculator = ({
  showSeoContent = true,
  showHeader = true,
  defaultGuests = '',
  defaultEventType = '',
  defaultAppetite = '',
  analyticsSource = 'calculator_page',
  className = '',
}: BiryaniCalculatorProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedOpen = useRef(false);

  const [guests, setGuests] = useState(defaultGuests);
  const [eventType, setEventType] = useState<EventType | ''>(defaultEventType);
  const [appetite, setAppetite] = useState<AppetiteLevel | ''>(defaultAppetite);
  const [pricePerKg, setPricePerKg] = useState('');
  const [result, setResult] = useState<ReturnType<
    typeof calculateBiryaniQuantity
  > | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const parsedPricePerKg = pricePerKg.trim() ? Number(pricePerKg) : null;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasTrackedOpen.current) {
          hasTrackedOpen.current = true;
          trackEvent(ANALYTICS_EVENTS.CALCULATOR_OPENED, {
            event_category: 'calculator',
            event_label: 'biryani_quantity_calculator',
            source: analyticsSource,
          });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [analyticsSource]);

  const validate = useCallback((): boolean => {
    const nextErrors: Record<string, string> = {};
    const guestNum = Number(guests);

    if (!guests.trim() || !Number.isFinite(guestNum) || guestNum < 1) {
      nextErrors.guests = 'Enter a valid number of guests (1–10,000)';
    } else if (guestNum > 10000) {
      nextErrors.guests = 'Maximum 10,000 guests';
    }

    if (!eventType) {
      nextErrors.eventType = 'Please select an event type';
    }

    if (!appetite) {
      nextErrors.appetite = 'Please select an appetite level';
    }

    if (pricePerKg.trim()) {
      const price = Number(pricePerKg);
      if (!Number.isFinite(price) || price <= 0) {
        nextErrors.pricePerKg = 'Please enter a valid price (greater than 0)';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [guests, eventType, appetite, pricePerKg]);

  const handleCalculate = () => {
    if (!validate()) return;

    const guestNum = Number(guests);
    const calc = calculateBiryaniQuantity(guestNum, appetite as AppetiteLevel);
    setResult(calc);

    trackEvent(ANALYTICS_EVENTS.CALCULATION_COMPLETED, {
      event_category: 'calculator',
      guests: guestNum,
      event_type: eventType,
      appetite_level: appetite,
      suggested_quantity_kg: calc.suggestedOrder,
      base_quantity_kg: calc.baseKg,
      price_per_kg: parsedPricePerKg,
      source: analyticsSource,
    });
  };

  const handleReset = () => {
    setGuests('');
    setEventType('');
    setAppetite('');
    setPricePerKg('');
    setResult(null);
    setErrors({});
  };

  const estimatedCost = useMemo(() => {
    if (!result || parsedPricePerKg === null || parsedPricePerKg <= 0) return null;
    return result.suggestedOrder * parsedPricePerKg;
  }, [result, parsedPricePerKg]);

  const appetiteLabel =
    APPETITE_OPTIONS.find((o) => o.value === appetite)?.label ?? appetite;

  const buildWhatsAppUrl = () => {
    const quantity = result ? `${formatKg(result.suggestedOrder)} KG` : '';
    const costLine =
      estimatedCost !== null && parsedPricePerKg !== null
        ? `Estimated Cost: ₹${estimatedCost.toLocaleString('en-IN')} (@ ₹${parsedPricePerKg.toLocaleString('en-IN')}/KG)\n`
        : '';
    const message = `Hi Biryani Palace,

I used the Biryani Quantity Calculator.

Event Type: ${eventType}
Guests: ${guests}
Appetite Level: ${appetiteLabel}
Suggested Quantity: ${quantity}
${costLine}
Please share pricing and ordering details.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent(ANALYTICS_EVENTS.WHATSAPP_CTA_CLICKED, {
      event_category: 'calculator',
      guests: Number(guests),
      event_type: eventType,
      appetite_level: appetite,
      suggested_quantity_kg: result?.suggestedOrder,
      source: analyticsSource,
    });
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="biryani-calculator"
      ref={sectionRef}
      className={`py-20 px-4 bg-gradient-subtle scroll-mt-24 ${className}`}
      aria-labelledby="calculator-heading"
    >
      <div className="container mx-auto max-w-5xl">
        {showHeader && (
          <>
            <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Calculator className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <h2
            id="calculator-heading"
            className="font-alata text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
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
          </h2>
          <p className="font-montserrat text-lg text-foreground/80 max-w-2xl mx-auto">
            Not sure how much biryani to order? Calculate the perfect quantity
            for your gathering in seconds.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-sm font-montserrat text-foreground/90"
            >
              <CheckCircle2
                className="w-4 h-4 text-primary shrink-0"
                aria-hidden="true"
              />
              {badge}
            </div>
          ))}
        </div>
          </>
        )}

        <Card className="bg-gradient-card border-2 border-primary/20 shadow-elegant overflow-hidden">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-alata text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                    Event Details
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground">
                    Fill in the details to calculate your biryani requirements
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-guests" className="font-montserrat">
                    Number of Guests *
                  </Label>
                  <Input
                    id="calc-guests"
                    type="number"
                    min={1}
                    max={10000}
                    inputMode="numeric"
                    placeholder="e.g. 25"
                    value={guests}
                    onChange={(e) => {
                      setGuests(e.target.value);
                      setErrors((prev) => ({ ...prev, guests: '' }));
                    }}
                    className="bg-background/50 border-border focus:border-primary font-montserrat text-base h-12"
                  />
                  {errors.guests && (
                    <p className="text-sm text-destructive font-montserrat">
                      {errors.guests}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-event" className="font-montserrat">
                    Event Type *
                  </Label>
                  <Select
                    value={eventType}
                    onValueChange={(v) => {
                      setEventType(v as EventType);
                      setErrors((prev) => ({ ...prev, eventType: '' }));
                    }}
                  >
                    <SelectTrigger
                      id="calc-event"
                      className="bg-background/50 border-border h-12 font-montserrat"
                    >
                      <SelectValue placeholder="Select event type…" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-sm text-destructive font-montserrat">
                      {errors.eventType}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="font-montserrat">Appetite Level *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {APPETITE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setAppetite(option.value);
                          setErrors((prev) => ({ ...prev, appetite: '' }));
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          appetite === option.value
                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
                            : 'border-border bg-background/30 hover:border-primary/40'
                        }`}
                      >
                        <span className="font-alata text-base font-bold text-foreground block">
                          {option.label}
                        </span>
                        <span className="font-montserrat text-xs text-muted-foreground mt-1 block">
                          1 KG serves {option.servesPerKg}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.appetite && (
                    <p className="text-sm text-destructive font-montserrat">
                      {errors.appetite}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calc-price" className="font-montserrat">
                    Price Per KG <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="calc-price"
                    type="number"
                    min={1}
                    inputMode="decimal"
                    placeholder={`e.g. ${CALCULATOR_DEFAULTS.pricePerKgPlaceholder}`}
                    value={pricePerKg}
                    onChange={(e) => {
                      setPricePerKg(e.target.value);
                      setErrors((prev) => ({ ...prev, pricePerKg: '' }));
                    }}
                    className="bg-background/50 border-border focus:border-primary font-montserrat text-base h-12"
                  />
                  {errors.pricePerKg ? (
                    <p className="text-sm text-destructive font-montserrat">
                      {errors.pricePerKg}
                    </p>
                  ) : (
                    <p className="font-montserrat text-xs text-muted-foreground">
                      Enter your biryani price per KG to see an estimated cost.
                      Quantity includes the 10% safety buffer.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold h-12 glow-gold text-base"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                    Calculate My Biryani
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-primary/30 text-foreground hover:bg-primary/10 font-montserrat h-12"
                    size="lg"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-alata text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
                    Your Biryani Plan
                  </h3>
                  <p className="font-montserrat text-sm text-muted-foreground">
                    {result
                      ? 'Calculated for your event'
                      : 'Results appear after calculation'}
                  </p>
                </div>

                {result ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-background/40 border border-border">
                        <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Base Quantity
                        </p>
                        <p className="font-alata text-2xl font-bold text-foreground">
                          {formatKg(result.baseKg)}{' '}
                          <span className="text-base font-montserrat text-muted-foreground">
                            KG
                          </span>
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-background/40 border border-border">
                        <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Shield className="w-3 h-3" aria-hidden="true" />
                          With 10% Buffer
                        </p>
                        <p className="font-alata text-2xl font-bold text-foreground">
                          {formatKg(result.bufferKg)}{' '}
                          <span className="text-base font-montserrat text-muted-foreground">
                            KG
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-primary/10 border-2 border-primary/40 text-center">
                      <p className="font-montserrat text-sm text-primary font-semibold uppercase tracking-wide mb-1">
                        Suggested Order
                      </p>
                      <p className="font-alata text-4xl font-bold text-primary">
                        {formatKg(result.suggestedOrder)} KG
                      </p>
                      <p className="font-montserrat text-xs text-muted-foreground mt-2">
                        Rounded up to nearest 0.5 KG
                      </p>
                    </div>

                    {estimatedCost !== null && parsedPricePerKg !== null && (
                      <div className="p-4 rounded-xl bg-background/40 border border-border">
                        <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Estimated Cost
                        </p>
                        <p className="font-alata text-2xl font-bold text-primary">
                          ₹{estimatedCost.toLocaleString('en-IN')}
                        </p>
                        <p className="font-montserrat text-xs text-muted-foreground mt-1">
                          @ ₹{parsedPricePerKg.toLocaleString('en-IN')} per KG
                          · includes buffer
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-alata text-lg font-bold text-foreground mb-3 text-center">
                        Ready to Order?
                      </h4>
                      <Button
                        onClick={handleWhatsAppClick}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-montserrat font-semibold h-14 text-base shadow-lg"
                        size="lg"
                      >
                        <MessageCircle
                          className="w-6 h-6 mr-2"
                          aria-hidden="true"
                        />
                        Order on WhatsApp
                      </Button>
                      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
                        <p className="font-montserrat text-sm text-foreground/90 flex items-start justify-center gap-2">
                          <Gift
                            className="w-4 h-4 text-primary shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>
                            Planning a wedding or large party? Ask about{' '}
                            <span className="text-primary font-semibold">
                              special bulk discounts
                            </span>{' '}
                            — we&apos;ll help you order the right quantity at
                            the best price.
                          </span>
                        </p>
                      </div>
                      <p className="font-montserrat text-xs text-center text-muted-foreground mt-3">
                        We&apos;ll receive your event details pre-filled — no
                        typing needed.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[280px] p-8 rounded-xl border border-dashed border-border bg-background/20 text-center">
                    <Calculator
                      className="w-12 h-12 text-muted-foreground/40 mb-4"
                      aria-hidden="true"
                    />
                    <p className="font-montserrat text-muted-foreground">
                      Enter your event details and tap Calculate to see your
                      personalised biryani plan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {showSeoContent && (
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="font-alata text-2xl font-bold text-foreground mb-6 text-center">
              Biryani Quantity Guide
            </h3>
            <div className="space-y-4">
              {SEO_FAQ.map((item) => (
                <article
                  key={item.question}
                  className="p-5 rounded-xl bg-gradient-card border border-border"
                >
                  <h4 className="font-alata text-base font-bold text-foreground mb-2">
                    {item.question}
                  </h4>
                  <p className="font-montserrat text-sm text-foreground/75 leading-relaxed">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSeoContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Biryani Quantity Calculator',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
              },
              provider: {
                '@type': 'Restaurant',
                name: 'Biryani Palace',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Kalyan',
                  addressRegion: 'Maharashtra',
                  addressCountry: 'IN',
                },
              },
              description:
                'Free biryani quantity calculator for parties, weddings, and family gatherings in India. Calculate how much biryani per person and get a suggested order quantity.',
            }),
          }}
        />
      )}
    </section>
  );
};

export default BiryaniCalculator;
