import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { favorites } from './mocks/favorites';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placeCount = 101;

root.render(
  <React.StrictMode>
    <App
      placeCount = {placeCount}
      offers = {offers}
      favorites = {favorites}
      comments = {comments}
    />
  </React.StrictMode>
);
