export type AppetiteLevel = 'light' | 'normal' | 'heavy';

export const APPETITE_OPTIONS: {
  value: AppetiteLevel;
  label: string;
  servesPerKg: number;
}[] = [
  { value: 'light', label: 'Light', servesPerKg: 8 },
  { value: 'normal', label: 'Normal', servesPerKg: 7 },
  { value: 'heavy', label: 'Heavy', servesPerKg: 6 },
];

export const EVENT_TYPES = [
  'Family Gathering',
  'Birthday Party',
  'Office Event',
  'Wedding',
  'Other',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

/** Round up to the nearest 0.5 KG (e.g. 1.10 → 1.5, 1.51 → 2.0). */
export function roundUpToHalfKg(kg: number): number {
  return Math.ceil(kg / 0.5) * 0.5;
}

export interface CalculationResult {
  baseKg: number;
  bufferKg: number;
  suggestedOrder: number;
  servingRatio: number;
}

export function calculateBiryaniQuantity(
  guests: number,
  appetite: AppetiteLevel
): CalculationResult {
  const servingRatio =
    APPETITE_OPTIONS.find((o) => o.value === appetite)?.servesPerKg ?? 7;
  const baseKg = guests / servingRatio;
  const bufferKg = baseKg * 1.1;
  const suggestedOrder = roundUpToHalfKg(bufferKg);

  return { baseKg, bufferKg, suggestedOrder, servingRatio };
}

export function formatKg(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}
