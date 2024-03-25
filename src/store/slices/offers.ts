import { PayloadAction, createSelector } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CityName } from "../../types/city-name";
import { Offer } from "../../types/offer";
import { cities } from "../../mocks/cities";
import { offers } from "../../mocks/offers";

type OffersState = {
  activeId?: Offer['id'];
  offers: Offer[];
}

const initialState: OffersState = {
  activeId: undefined,
  offers,
}

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setActiveId: (state, action: PayloadAction<Offer['id'] | undefined>) => {
      state.activeId = action.payload;
    },
  },
  selectors: {
    activeId: (state: OffersState) => state.activeId,
    offers: (state: OffersState) => state.offers,
  }
});

const offersActions = offersSlice.actions;
const offersSelectors = offersSlice.selectors;

export {offersActions, offersSelectors, offersSlice};
