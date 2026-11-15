export interface SimulatedReceipt {
  bookingReference: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  currency: string;
}

/** Builds a fake email receipt body, as a simulated hotel would send it. */
export function renderReceiptEmail(receipt: SimulatedReceipt): string {
  return [
    `Subject: Booking confirmation ${receipt.bookingReference}`,
    '',
    `Thank you for booking with ${receipt.hotelName}.`,
    `Check-in: ${receipt.checkIn}`,
    `Check-out: ${receipt.checkOut}`,
    `Total: ${receipt.totalPrice.toFixed(2)} ${receipt.currency}`,
  ].join('\n');
}
