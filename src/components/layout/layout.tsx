import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../const/const';
import { AuthorizationStatus } from '../const/const';
import { getLayoutState } from './utils';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { logoutAction } from '../../store/api-action';

export default function Layout() {
  const {pathname} = useLocation();
  const {rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter} = getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const countFavorite = useAppSelector((state) => state.offers.favoritesOffers);
  const userData = useAppSelector((state) => state.user.userData);

  const dispatch = useAppDispatch();

  const divStyle = {
    backgroundImage: `url(${userData?.avatarUrl})`,
    borderRadius: '50%',
  };

  return (
    <div className={`page ${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={`header__logo-link${linkClassName}`} to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={divStyle}>
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">{userData?.email}</span>
                            <span className="header__favorite-count">{countFavorite.length}</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Root}
                          onClick={(evt) => {
                            evt.preventDefault();
                            dispatch(logoutAction());
                          }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter ? (
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Root}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      ) : null }
    </div>
  );
}
