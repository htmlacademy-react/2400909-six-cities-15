import FavoritesCities from './favorites-cities';
import { Offer } from '../../types/offer';

type TFavoriteProps = {
  favorites: Offer[];
}

function FavoritesPage({favorites}: TFavoriteProps): JSX.Element {
  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                cities.map((city) =>
                  (<FavoritesCities favorites={favorites} city={cities} key={city}/>))
              }
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
