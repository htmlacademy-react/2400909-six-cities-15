import FavoritesCities from './favorites-cities';
import { store } from '../../store';
import { fetchFavoritesOffersAction } from '../../store/api-action';
import { useAppSelector } from '../../components/hooks/store';
import { CityName } from '../../types/city-name';

store.dispatch(fetchFavoritesOffersAction());

function FavoritesPage(): JSX.Element {
  const favorites = useAppSelector((state) => state.favoritesOffers);
  const uniqueCities = [...new Set(favorites.map((favorite) => favorite.city.name))];

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                uniqueCities.map((city) =>
                  (<FavoritesCities favorites={favorites} city={city as CityName} key={city}/>))
              }
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
