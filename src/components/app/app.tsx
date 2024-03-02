import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoute from '../const';
//import { AuthorizationStatus } from '../const/const';
import MainPage from '../../pages/main-page';
//import FavoritesEmptyPage from '../../pages/favorites-empty-page';
import FavoritesPage from '../../pages/favorites-page';
import LoginPage from '../../pages/login-page';
// import MainEmptyPage from '../../pages/main-empty-page';
import OfferPage from '../../pages/offer-page';
// import OfferNotLoggedPage from '../../pages/offer-not-logged-page';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top';
import NotFoundPage from '../not-found-page';
import Layout from '../layout/layout';
import { getAuthorizationStatus } from '../../authorizationStatus';


type AppProps = {
  placeCount: number;
}

function App({placeCount}: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          />
          <Route
            index
            element={<MainPage placeCount = {placeCount} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
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
            element={<OfferPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
