import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoute from '../const';
import MainPage from '../../pages/main-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
import OfferPage from '../../pages/offer-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top';
import NotFoundPage from '../not-found-page';
import Layout from '../layout/layout';
import { getAuthorizationStatus } from '../../authorizationStatus';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';
import { City } from '../../types/offer';
import { CityName } from '../../types/city-name';

type AppProps = {
  placeCount: number;
  offers: Offer[];
  favorites: Offer[];
  cities: City[];
  citiesName: CityName[];
  comments: Comment[];
}

function App({placeCount, offers, favorites, cities, citiesName, comments}: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={
                <MainPage
                  placeCount = {placeCount}
                  offers = {offers}
                  citiesName = {citiesName}
                />
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage
                    cities = {cities}
                    favorites = {favorites}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Login}
              element={(
                <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                  <LoginPage />
                </PrivateRoute>
              )}
            />
            <Route
              path={AppRoute.Offer}
              element={
                <OfferPage
                  comments = {comments}
                />
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
