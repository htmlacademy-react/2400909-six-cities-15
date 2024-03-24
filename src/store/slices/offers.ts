import { PayloadAction, createSelector } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CityName } from "../../types/city-name";
import { Offer } from "../../types/offer";
import { cities } from "../../mocks/cities";
import { offers } from "../../mocks/offers";

type OffersState = {
  city: CityName;
  offers: Offer[];
}

const initialState: OffersState = {
  city: cities[0],
  offers,
}

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
  },
  selectors: {
    city: (state: OffersState) => state.city,
    offers: (state: OffersState) => state.offers,
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = {
 ...offersSlice.selectors,
 cityOffers: createSelector(offersSlice.selectors.offers, offersSlice.selectors.city, (allOffers,
  city) =>
  allOffers.filter((offer) => offer.city.name === city),
  ),
};

export {offersActions, offersSelectors, offersSlice};
