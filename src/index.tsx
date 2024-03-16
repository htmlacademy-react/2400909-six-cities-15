import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
//import { cities } from './mocks/cities';
import { favorites } from './mocks/favorites';
import { offers } from './mocks/offers';
// import { comments } from './mocks/comments';
//import { getOfferById } from './mocks/extended-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placeCount = 101;

//const currentOffer = getOfferById();


root.render(
  <React.StrictMode>
    <App
      placeCount = {placeCount}
      offers = {offers}
      favorites = {favorites}
      // cities = {cities}
      // comments = {comments}
      // currentOffer = {currentOffer}
    />
  </React.StrictMode>
);
