import { createSlice } from '@reduxjs/toolkit';
import { SortType } from '../../components/sort/const';
import { ExtendedOffer } from '../../types/extended-offer';
import { Offer } from '../../types/offer';
import { changeOffer, changeSortType, getFavoritesOffers, getNearbyOffers, getOfferId, getOffers } from '../action';


const offersInitialState: {
  currentSortType: SortType;
  offers: Offer[];
  offer: ExtendedOffer | null;
  nearbyOffers: Offer[];
  favoritesOffers: Offer[];
} = {
  currentSortType: SortType.Popular,
  offers: [],
  offer: null,
  nearbyOffers: [],
  favoritesOffers: [],
};

export const offersReducer = createSlice({
  name: 'offersReducer',
  initialState: offersInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(changeSortType, (state, {payload}) => {
        state.currentSortType = payload;
      })
      .addCase(getOffers, (state, {payload}) => {
        state.offers = payload;
      })
      .addCase(changeOffer, (state, {payload}) => {
        state.offers = state.offers.map((offer) => {
          if (offer.id === payload.id) {
            return {...offer, isFavorite: payload.isFavorite};
          }
          return offer;
        });

        if (state.offer && state.offer.id === payload.id) {
          state.offer = {...state.offer, isFavorite: payload.isFavorite};
        }

        state.nearbyOffers = state.nearbyOffers.map((nearbyOffer) => {
          if (nearbyOffer.id === payload.id) {
            return {...nearbyOffer, isFavorite: payload.isFavorite};
          }
          return nearbyOffer;
        });
      })
      .addCase(getOfferId, (state, {payload}) => {
        state.offer = payload;
      })
      .addCase(getNearbyOffers, (state, {payload}) => {
        state.nearbyOffers = payload;
      })
      .addCase(getFavoritesOffers, (state, {payload}) => {
        state.favoritesOffers = payload;
      });
  }
});
