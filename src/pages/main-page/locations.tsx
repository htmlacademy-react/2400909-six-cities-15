import { CITIES } from '../../components/const/const';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks/store';
import { changeCity } from '../../store/action';

export default function Locations(): JSX.Element {
  const currentCity = useAppSelector((state) => state.currentCity);
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) => (
              <li key={city} className="locations__item">
                <Link
                  className={`locations__item-link tabs__item${currentCity === city ? ' tabs__item--active' : ''}`}
                  to="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(changeCity(city))
                  }}
                >
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
