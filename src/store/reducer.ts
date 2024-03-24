import { CityName } from "../types/city-name";
import { Offer } from "../types/offer";

import { cities } from "../mocks/cities";
import { offers } from "../mocks/offers";
import { createAction, createReducer } from "@reduxjs/toolkit";

type OffersState = {
  city: CityName;
  offers: Offer[];
}

const initialState: OffersState = {
  city: cities[0],
  offers,
}

const setCity = createAction<CityName>('offers/setCity');

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });
});

// const enum ActionType {
//   SetCity = 'offers/setCity',
// };

// const setCity = (city: CityName) => ({
//   payload: city,
//   type: ActionType.SetCity,
// });

// function reducer(state: OffersState = initialState, action: {payload: unknown, type: ActionType}): OffersState {
//   switch (action.type) {
//     case ActionType.SetCity:
//       return {
//         ...state,
//         city: action.payload as CityName,
//       };
//     default:
//       return state;
//   }
// }

export {reducer, setCity};
