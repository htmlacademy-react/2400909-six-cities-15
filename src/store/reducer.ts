import { createReducer } from "@reduxjs/toolkit";
import { changeCity } from "./action";
import { getOffers } from "./action";
import { Offer } from "../types/offer";

const initialState: {
  currentCity: string;
  offers: Offer[];
} = {
  currentCity: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, {payload}) => {
      state.currentCity = payload;
    })
    .addCase(getOffers, (state, {payload}) => {
      state.offers = payload;
    });
});

export { reducer, getOffers };
