/** Edit biryani prices here — used by the quantity calculator cost estimate. */
export const CALCULATOR_PRICING = {
  chickenDumBiryani: {
    name: 'Chicken Dum Biryani',
    pricePerKg: 999,
  },
} as const;

export type CalculatorPricingKey = keyof typeof CALCULATOR_PRICING;
