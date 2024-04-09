import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { favorites } from './mocks/favorites';
import { offers } from './mocks/offers';
import { comments } from './mocks/comments';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const placeCount = 101;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        placeCount = {placeCount}
        offers = {offers}
        favorites = {favorites}
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>
);
