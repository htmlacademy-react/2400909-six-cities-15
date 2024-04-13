import { useMemo, useState } from 'react';

import OfferCardComponent from '../../components/offer-card-component';
import Locations from './locations';
import { Map } from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { SortType } from '../../components/sort/const';
import { useAppSelector } from '../../components/hooks/store';
import { Offer } from '../../types/offer';
import MainEmptyPage from '../main-empty-page';

const sortOffer = {
  [SortType.Popular]: () => 0,
  [SortType.PriceLowToHigh]: ((a: Offer, b: Offer) => a.price - b.price),
  [SortType.PriceHighToLow]: ((a: Offer, b: Offer) => b.price - a.price),
  [SortType.TopRatedFirst]: ((a: Offer, b: Offer) => b.rating - a.rating),
};

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>();

  const offers = useAppSelector((state) => state.offers.offers.filter((offer) => offer.city.name === state.city.currentCity));
  const currentSortType = useAppSelector((state) => state.offers.currentSortType);
  const sortedOffers = useMemo(() => [...offers].sort(sortOffer[currentSortType]), [offers, currentSortType]);
  const currentCity = useAppSelector((state) => state.city.currentCity);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Locations />

      <div className="cities">
        {sortedOffers.length === 0 ?
          <MainEmptyPage /> :
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} place{sortedOffers.length > 1 && 's'} to stay in {currentCity}{' '}
              </b>
              <Sort />
              <div className="cities__places-list places__list tabs__content">

                {sortedOffers.map((offer) => (
                  <OfferCardComponent
                    block="cities"
                    offer={offer}
                    key={offer.id}
                    setActiveId={setActiveOfferId}
                  />
                ))}

              </div>
            </section>
            <div className="cities__right-section">
              {
                sortedOffers[0]?.city &&
              <Map
                className={'cities'}
                offers = {sortedOffers}
                activeOfferId={activeOfferId}
              />
              }
            </div>
          </div>}
      </div>
    </main>
  );
}

export default MainPage;
