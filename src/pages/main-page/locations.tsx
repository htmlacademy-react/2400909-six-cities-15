import { CITIES } from '../../components/const/const';
import { Link } from 'react-router-dom';

export default function Locations(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => (
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
