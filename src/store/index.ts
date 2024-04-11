import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offersReducer } from './offers-reducer/offers-reducer';
import { cityReducer } from './city-reducer/city-reducer';
import { loadingReducer } from './loading-reducer/loading-reducer';
import { userReducer } from './user-reducer/user-reducer';

const rootReducer = combineReducers({
  offers: offersReducer.reducer,
  city: cityReducer.reducer,
  loading: loadingReducer.reducer,
  user: userReducer.reducer,
})

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      thunk: {
        extraArgument: api,
      },
    }),
});

