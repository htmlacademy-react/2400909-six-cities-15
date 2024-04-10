import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, RootStore } from '../types/store';
import { Offer } from '../types/offer';
import { ExtendedOffer } from '../types/extended-offer';
import { UserComment } from '../types/user-comment';
import { StatusFavorite } from '../types/status-favorite';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

import { APIRoute, AuthorizationStatus, AppRoute, TIMEOUT_SHOW_ERROR } from '../components/const/const';

import { getOffers,
  setOffersDataLoadingStatus,
  getComments,
  requireAuthorization,
  getFavoritesOffers,
  getOfferId,
  getUserData,
  redirectToRoute,
  getNearbyOffers,
  setError,
  setCurrentOfferDataLoadingStatus} from './action';
import { store } from '.';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(getOffers(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment>(`${APIRoute.Review}/${id}`);
    dispatch(getComments(data));
  },
);

export const saveCommentAction = createAsyncThunk<void, UserComment, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/saveComment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post<UserComment>(`${APIRoute.Review}/${id}`, {comment, rating});
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(fetchCommentsAction(id as string));
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/fetchFavoritesOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(APIRoute.Favorites);
    dispatch(getFavoritesOffers(data));
  },
);

export const saveFavoritesOffersAction = createAsyncThunk<void, StatusFavorite, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/saveFavoritesOffers',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    await api.post<UserComment>(`${APIRoute.Favorites}/${id}/${isFavorite}`);
    dispatch(fetchFavoritesOffersAction());
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async(id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer []>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(getNearbyOffers (data));
  },
);

export const fetchOfferIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'data/fetchOfferId',
  async(id, {dispatch, extra: api}) => {
    dispatch(setCurrentOfferDataLoadingStatus(true));
    try{
      const {data} = await api.get<ExtendedOffer>(`${APIRoute.Offers}/${id}`);
      dispatch(getOfferId(data));
    }catch{
      dispatch(getOfferId(null));
    }
    dispatch(setCurrentOfferDataLoadingStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async(_arg, {dispatch, extra: api}) => {
    try{
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    }catch{
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try{
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      dispatch(getUserData(data));
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Root));
    }catch{
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootStore;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(getUserData(null));
  },
);

export const clearErrorAction = createAsyncThunk(
  'cities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
