import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../components/const/const';
import { Comment } from '../types/comment';
import { ExtendedOffer } from '../types/extended-offer';
import { UserData } from '../types/user-data';
import { SortType } from '../components/sort/const';
import { StatusFavorite } from '../types/status-favorite';

export const changeCity = createAction<string>('cities/changeCity');

export const changeSortType = createAction<SortType>('cities/changeSortType');

export const changeOffer = createAction<StatusFavorite>('cities/changeOffer');

export const getOffers = createAction<Offer>('cities/addOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const getComments = createAction<Comment>('cities/addComments');

export const getOfferId = createAction<ExtendedOffer | null>('cities/getOfferId');

export const getNearbyOffers = createAction<Offer[]>('cities/getNearbyOffers');

export const getFavoritesOffers = createAction<Offer>('cities/getFavoritesOffers');

export const getUserData = createAction<UserData | null>('getUserData ');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setCurrentOfferDataLoadingStatus = createAction<boolean>('data/setCurrentOfferDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('cities/redirectToRoute');

export const setError = createAction<string | null>('cities/setError');
