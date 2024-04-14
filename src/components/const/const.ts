export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFoundPage = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute{
  Offers = '/offers',
  Favorites = '/favorite',
  Review = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export const URL_MARKER_DEFAULT = './img/pin.svg';

export const URL_MARKER_ACTIVE = './img/pin-active.svg';

export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_COUNT_COMMENTS = 10;


