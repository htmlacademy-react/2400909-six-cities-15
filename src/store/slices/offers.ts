import { PayloadAction } from "@reduxjs/toolkit";
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
    city: (state) => state.city,
    offers: (state) => state.offers,
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.actions;

export {offersActions, offersSelectors, offersSlice};
