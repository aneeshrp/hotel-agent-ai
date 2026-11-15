import { describe, expect, it } from 'vitest';
import { renderReceiptEmail } from './index.js';

describe('simulator', () => {
  it('renders a receipt email with the booking details', () => {
    const email = renderReceiptEmail({
      bookingReference: 'ABC123',
      hotelName: 'Station Hotel',
      checkIn: '2027-03-12',
      checkOut: '2027-03-14',
      totalPrice: 280,
      currency: 'GBP',
    });
    expect(email).toContain('ABC123');
    expect(email).toContain('Total: 280.00 GBP');
  });
});
