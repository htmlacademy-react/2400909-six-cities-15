import { createSlice } from '@reduxjs/toolkit';
import { changeCity } from '../action';

const cityInitialState: {
  currentCity: string;
} = {
  currentCity: 'Paris',
};


export const cityReducer = createSlice({
  name: 'cityReducer',
  initialState: cityInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, {payload}) => {
        state.currentCity = payload;
      });
  }
});
