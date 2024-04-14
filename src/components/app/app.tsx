import { Route, Routes } from 'react-router-dom';
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
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus } from '../const/const';
import HistoryRoute from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { fetchFavoritesOffersAction, fetchOffersAction } from '../../store/api-action';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.loading.isOffersDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesOffersAction());
    }

    dispatch(fetchOffersAction());
  }, [dispatch, authorizationStatus]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRoute history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={
                <MainPage />
              }
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
              element={
                <OfferPage />
              }
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </HistoryRoute>
    </HelmetProvider>
  );
}

export default App;
