import { z } from 'zod';

const E164 = /^\+[1-9]\d{1,14}$/;

const hasAtMostOneDecimal = (n: number): boolean => Math.abs(n * 10 - Math.round(n * 10)) < 1e-9;

/** A hotel as validated from external data. Unknown keys are stripped. */
export const HotelSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1),
  city: z.string().trim().min(1),
  /** Integer pennies, GBP. */
  pricePerNight: z.number().int().positive(),
  rating: z.number().min(0).max(5).refine(hasAtMostOneDecimal, {
    message: 'Rating must have at most one decimal place',
  }),
  maxGuests: z.number().int().min(1),
  /** E.164 format. Format only: calls still go to the simulator alone. */
  phone: z.string().regex(E164, 'Phone must be in E.164 format'),
});

export type Hotel = z.infer<typeof HotelSchema>;
