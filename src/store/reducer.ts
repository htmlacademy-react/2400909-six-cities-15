import { createReducer } from '@reduxjs/toolkit';
import { changeCity, requireAuthorization } from './action';
import { getOffers } from './action';
import { offers } from '../mocks/offers';
import { AuthorizationStatus } from '../components/const/const';

const initialState = {
  currentCity: 'Paris',
  offers,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
