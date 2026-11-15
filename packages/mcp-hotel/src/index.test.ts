import { describe, expect, it } from 'vitest';
import { rankOffers, searchHotels, type HotelOffer } from './index.js';

const offer = (hotelId: string, pricePerNight: number): HotelOffer => ({
  hotelId,
  name: hotelId,
  pricePerNight,
  currency: 'GBP',
  phone: '+440000000000',
});

describe('mcp-hotel', () => {
  it('ranks offers cheapest first', () => {
    const offers = [offer('a', 140), offer('b', 95), offer('c', 120)];
    expect(rankOffers(offers).map((o) => o.hotelId)).toEqual(['b', 'c', 'a']);
    expect(offers[0]?.hotelId).toBe('a');
  });

  it('search stub returns no offers', async () => {
    await expect(
      searchHotels({ city: 'X', checkIn: '2027-03-12', checkOut: '2027-03-14', guests: 2 }),
    ).resolves.toEqual([]);
  });
});
