import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCity = createAction<string>('cities/changeCity');
export const getOffers = createAction<Offer[]>('cities/addCity');
