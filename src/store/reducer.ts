import { createReducer } from '@reduxjs/toolkit';
import { changeCity,
  getOfferId,
  requireAuthorization,
  getComments,
  getFavoritesOffers,
  getNearbyOffers,
  getOffers,
  getUserData,
  setOffersDataLoadingStatus,
  setCurrentOfferDataLoadingStatus,
  changeSortType} from './action';
import { AuthorizationStatus } from '../components/const/const';
import { Offer } from '../types/offer';
import { ExtendedOffer } from '../types/extended-offer';
import { Comment } from '../types/comment';
import { UserData } from '../types/user-data';
import { SortType } from '../components/sort/const';

type InitialState = {
  currentCity: string;
  currentSortType: SortType;
  offers: Offer[];
  offer: ExtendedOffer | null;
  nearbyOffers: Offer[];
  favoritesOffers: Offer[];
  comments: Comment[];
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  isOffersDataLoading: boolean;
  isCurrentOfferDataLoading: boolean;
}

const initialState: InitialState = {
  currentCity: 'Paris',
  currentSortType: SortType.Popular,
  offers: [],
  offer: null,
  nearbyOffers: [],
  favoritesOffers: [],
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isOffersDataLoading: false,
  isCurrentOfferDataLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(changeSortType, (state, {payload}) => {
      state.currentSortType = payload;
    })
    .addCase(getOffers, (state, {payload}) => {
      state.offers = payload;
    })
    .addCase(getOfferId, (state, {payload}) => {
      state.offer = payload;
    })
    .addCase(requireAuthorization, (state, {payload}) => {
      state.authorizationStatus = payload;
    })
    .addCase(getComments, (state, {payload}) => {
      state.comments = payload;
    })
    .addCase(getNearbyOffers, (state, {payload}) => {
      state.nearbyOffers = payload;
    })
    .addCase(getFavoritesOffers, (state, {payload}) => {
      state.favoritesOffers = payload;
    })
    .addCase(getUserData, (state, {payload}) => {
      state.userData = payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, {payload}) => {
      state.isOffersDataLoading = payload;
    })
    .addCase(setCurrentOfferDataLoadingStatus, (state, {payload}) => {
      state.isCurrentOfferDataLoading = payload;
    });
});

export { reducer };
