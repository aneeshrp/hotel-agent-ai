export interface HotelSearchCriteria {
  city: string;
  checkIn: string; // ISO date, e.g. 2027-03-12
  checkOut: string;
  guests: number;
  maxPricePerNight?: number;
  currency?: string;
  preferences?: string[];
}

export interface HotelOffer {
  hotelId: string;
  name: string;
  pricePerNight: number;
  currency: string;
  phone: string;
}

/** Placeholder: returns no offers until a real search provider is wired in. */
export async function searchHotels(_criteria: HotelSearchCriteria): Promise<HotelOffer[]> {
  return [];
}

/** Sorts offers cheapest first without mutating the input. */
export function rankOffers(offers: readonly HotelOffer[]): HotelOffer[] {
  return [...offers].sort((a, b) => a.pricePerNight - b.pricePerNight);
}
