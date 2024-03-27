import { MouseEvent, useState } from 'react';

import { CityName } from '../../types/city-name';
import { Offer } from '../../types/offer';

import OfferCardComponent from '../../components/offer-card-component';
import Locations from './locations';
import { Map } from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { SortOption } from '../../components/sort/const';
import { useAppDispatch, useAppSelector } from '../../components/hooks/store';
import { getOffers } from '../../store/action';

type MainPageProps = {
  city: CityName;
  offers: Offer[];
}

function MainPage({city, offers}: MainPageProps): JSX.Element {
  const {activeId, setActiveId} = useState<string | undefined>();
  const dispatch = useAppDispatch();
  dispatch(getOffers(offers));

  const currentOffers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === state.currentCity));

  const [activeSort, setActiveSort] = useState(SortOption.Popular);


  const handleMouseEnter = (evt: MouseEvent<HTMLElement>) => {
    const target = evt.currentTarget as HTMLElement;
    const id = target.dataset.id;
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(undefined);
  };

  let sortedOffers = offers;

  if (activeSort === SortOption.PriceLowToHigh) {
    sortedOffers = [...offers].sort((a, b) => a.price - b.price);
  }

  if (activeSort === SortOption.PriceHighToLow) {
    sortedOffers = [...offers].sort((a, b) => b.price - a.price);
  }

  if (activeSort === SortOption.TopRatedFirst) {
    sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Locations />

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offers.length} place{offers.length > 1 && 's'} to stay in {city}{' '}
            </b>
            <Sort current={activeSort} setter={setActiveSort}/>
            <div className="cities__places-list places__list tabs__content">

              {offers.map((offer) =>
                (<OfferCardComponent
                  block="cities"
                  offer={offer}
                  key={offer.id}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  setActiveId={setActiveId}
                />))}

            </div>
          </section>
          <div className="cities__right-section">
            <Map
              currentCity={currentOffers[0].city}
              points = {currentOffers}
              activeId={activeId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
