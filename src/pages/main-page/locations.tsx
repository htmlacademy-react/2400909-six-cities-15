import { City } from '../../types/offer';
import { Link } from 'react-router-dom';

type Props = {
  cities: City[];
}

export default function Locations({cities}: Props): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => (
              <li key={city} className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>{city}</span>
                </Link>
              </li>)
            )
          }
        </ul>
      </section>
    </div>
  );
}
