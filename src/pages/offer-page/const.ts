import { ExtendedOffer } from "../../types/extended-offer";
import { Offer } from "../../types/offer";
import { offers } from "../../mocks/offers";

const MAX_NEAR_OFFERS = 3;

export const getNearOffers = (offer: ExtendedOffer | undefined) => {
  const nearOffers: Offer[] = [];

  if (offer) {
    for (let i = 0; i < offers.length; i++) {
      if (offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
        nearOffers.push(offers[i]);
      }

      if (nearOffers.length >= MAX_NEAR_OFFERS) {
        break;
      }
    }
  }

  return nearOffers;
};
