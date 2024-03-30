import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../components/const/const';
import { Comment } from '../types/comment';
import { ExtendedOffer } from '../types/extended-offer';
import { UserData } from '../types/user-data';

export const changeCity = createAction<string>('cities/changeCity');

export const getOffers = createAction<Offer>('cities/addOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const getComments = createAction<Comment>('cities/addComments');

export const getOfferId = createAction<ExtendedOffer | null>('сities/getOfferId');

export const getNearbyOffers = createAction<Offer[]>('сities/getNearbyOffers');

export const getFavoritesOffers = createAction<Offer>('сities/getFavoritesOffers');

export const getUserData = createAction<UserData>('getUserData ');

export const setError = createAction<string | null>('сities/setError');
