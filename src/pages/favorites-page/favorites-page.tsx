import FavoritesCities from './favorites-cities';
import { useAppSelector } from '../../components/hooks/store';
import { CityName } from '../../types/city-name';

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector((state) => state.offers.favoritesOffers);
  const uniqueCities = [...new Set(favorites.map((favorite) => favorite.city.name))];

  return (
    <div className="page">
      <main className={`page__main page__main--favorites${favorites.length > 0 ? '' : ' page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favorites.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  uniqueCities.map((city) =>
                    (<FavoritesCities favorites={favorites} city={city as CityName} key={city}/>))
                }
              </ul>
            </section>) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
