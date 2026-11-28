import { describe, expect, expectTypeOf, it } from 'vitest';
import { HotelSchema, type Hotel } from './hotel.js';

// Fake number from Ofcom's drama range (+44 7700 900xxx). Never a real one.
const valid: Hotel = {
  id: '3f2b8c1e-9d4a-4e6b-8a7c-1b2d3e4f5a6b',
  name: 'Test Hotel',
  city: 'City X',
  pricePerNight: 12500,
  rating: 4.5,
  maxGuests: 2,
  phone: '+447700900123',
};

const rejects = (patch: Record<string, unknown>): void => {
  expect(HotelSchema.safeParse({ ...valid, ...patch }).success).toBe(false);
};

describe('HotelSchema', () => {
  it('accepts a valid hotel unchanged', () => {
    expect(HotelSchema.parse(valid)).toEqual(valid);
  });

  it('trims name and city', () => {
    const parsed = HotelSchema.parse({ ...valid, name: '  Test Hotel ', city: ' City X  ' });
    expect(parsed.name).toBe('Test Hotel');
    expect(parsed.city).toBe('City X');
  });

  it('strips unknown keys', () => {
    expect(HotelSchema.parse({ ...valid, extra: 'x' })).not.toHaveProperty('extra');
  });

  it.each(Object.keys(valid))('rejects a missing %s', (key) => {
    const { [key]: _omitted, ...rest } = valid as Record<string, unknown>;
    expect(HotelSchema.safeParse(rest).success).toBe(false);
  });

  it.each(['hotel-1', ''])('rejects id %j', (id) => rejects({ id }));

  it.each(['', '   '])('rejects blank name and city %j', (blank) => {
    rejects({ name: blank });
    rejects({ city: blank });
  });

  it.each([0, -100, 125.5])('rejects pricePerNight %d', (pricePerNight) =>
    rejects({ pricePerNight }),
  );

  it.each([-0.1, 5.1, 4.55])('rejects rating %d', (rating) => rejects({ rating }));

  it.each([0, 1.5])('rejects maxGuests %d', (maxGuests) => rejects({ maxGuests }));

  it.each([
    '447700900123',
    '+44 7700 900123',
    '+44-7700-900123',
    '+0447700900',
    '+1234567890123456',
  ])('rejects phone %j', (phone) => rejects({ phone }));

  it.each([{ rating: 0 }, { rating: 5 }, { rating: 4.1 }, { maxGuests: 1 }, { pricePerNight: 1 }])(
    'accepts boundary %j',
    (patch) => {
      expect(HotelSchema.safeParse({ ...valid, ...patch }).success).toBe(true);
    },
  );

  it('infers the Hotel type with exactly seven fields', () => {
    expectTypeOf<Hotel>().toEqualTypeOf<{
      id: string;
      name: string;
      city: string;
      pricePerNight: number;
      rating: number;
      maxGuests: number;
      phone: string;
    }>();
  });
});
