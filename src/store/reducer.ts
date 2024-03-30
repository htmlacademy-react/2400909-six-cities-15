import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { getOffers } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  currentCity: 'Paris',
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(getOffers, (state, {action}) => {
      state.offers = action.payload;
    });
});

export { reducer };
