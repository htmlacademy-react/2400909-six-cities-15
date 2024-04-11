import { createSlice } from '@reduxjs/toolkit';
import { setCurrentOfferDataLoadingStatus, setError, setOffersDataLoadingStatus } from '../action';


const loadingInitialState: {
  error: null | string;
  isOffersDataLoading: boolean;
  isCurrentOfferDataLoading: boolean;
} = {
  error: null,
  isOffersDataLoading: false,
  isCurrentOfferDataLoading: true,
};

export const loadingReducer = createSlice({
  name: 'loadingReducer',
  initialState: loadingInitialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(setError, (state, {payload}) => {
        state.error = payload;
      })
      .addCase(setOffersDataLoadingStatus, (state, {payload}) => {
        state.isOffersDataLoading = payload;
      })
      .addCase(setCurrentOfferDataLoadingStatus, (state, {payload}) => {
        state.isCurrentOfferDataLoading = payload;
      });
  },
});
