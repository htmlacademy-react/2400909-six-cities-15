import { useMemo, useState } from 'react';

import OfferCardComponent from '../../components/offer-card-component';
import Locations from './locations';
import { Map } from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { SortType } from '../../components/sort/const';
import { useAppSelector } from '../../components/hooks/store';
import { Offer } from '../../types/offer';

type Props = {
  setSort: (str: SortType) => void ;
  activeOfferSort: SortType;
}

const sortOffer = {
  [SortType.Popular]: () => 0,
  [SortType.PriceLowToHigh]: ((a: Offer, b: Offer) => a.price - b.price),
  [SortType.PriceHighToLow]: ((a: Offer, b: Offer) => b.price - a.price),
  [SortType.TopRatedFirst]: ((a: Offer, b: Offer) => b.rating - a.rating),
}

function MainPage({setSort, activeOfferSort}: Props): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>();

  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === state.currentCity));
  const sortedOffers = useMemo(() => [...offers].sort(sortOffer[activeOfferSort]), [offers, activeOfferSort]);
  const currentCity = useAppSelector((state) => state.currentCity);

  const [activeSort, setActiveSort] = useState<boolean>(false);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Locations />

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {sortedOffers.length} place{sortedOffers.length > 1 && 's'} to stay in {currentCity}{' '}
            </b>
            <Sort
              activeOfferSort={activeOfferSort}
              setSort={setSort}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
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
        </div>
      </div>
    </main>
  );
}

export default MainPage;
