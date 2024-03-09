import { Link } from 'react-router-dom';
import CitiesItems from './cities-items';
import { Offer } from '../../types/offer';
import { City } from '../../types/offer';

type TFavoritesCitiesProps = {
  favorites: Offer[];
  cities: City;
}

export default function FavoritesCities({favorites, cities}: TFavoritesCitiesProps): JSX.Element | null {
  const favoritesCities = favorites
    .filter((favorite) => favorite.city.name === cities);

  //const {city} = favoritesCities;

  return (
    (favoritesCities.length > 0) ? (
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to="#">
              <span>{cities}</span>
            </Link>
          </div>
        </div>

        <div className="favorites__places">
          {
            favoritesCities.map((favorite) => <CitiesItems favorite={favorite} key={favorite.id}/>)
          }
        </div>
      </li>
    ) : null
  );
}
