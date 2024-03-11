import { ExtendedOffer } from '../../types/extended-offer';
import { extendedOffers } from '../../mocks/extended-offers';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFoundPage = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_ACTIVE = './img/pin-active.svg';

const MAX_NEAR_OFFERS = 3;

export const getNearOffers = (offer: ExtendedOffer) => {
  const nearOffers: ExtendedOffer[] = [];

  for (let i = 0; i < extendedOffers.length; i++) {
    if (extendedOffers[i].id !== offer.id && extendedOffers[i].city.name === offer.city.name) {
      nearOffers.push(extendedOffers[i]);
    }

    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }

  return nearOffers;
};

