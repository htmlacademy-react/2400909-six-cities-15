import { Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import AppRoute from '../const';
import MainPage from '../../pages/main-page';
import FavoritesEmptyPage from '../../pages/favorites-empty-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import MainEmptyPage from '../../pages/main-empty-page';
import OfferPage from '../../pages/offer-page';
import OfferNotLoggedPage from '../../pages/offer-not-logged-page';
import { Fragment } from 'react';

type AppProps = {
  placeCount: number;
}

function App({placeCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage placeCount = {placeCount} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={
            <Fragment>
              <h1>
                404.
                <br />
                <small>Page is not found</small>
              </h1>
              <Link to="/">Go to main page</Link>
            </Fragment>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
