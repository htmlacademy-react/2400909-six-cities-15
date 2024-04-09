import { useEffect, useState } from 'react';
import { SortType } from './const';

type SortProps = {
  setSort: (str: SortType) => void;
  activeOfferSort: SortType;
  setFilter: (str: boolean) => void;
  isFilter: boolean;

}

export default function Sort({setSort, activeOfferSort, setFilter, isFilter}: SortProps): JSX.Element {
  const [isOpened, setOpened] = useState(false);

  // useEffect(() => {
  //   const onEscKeyDown = (evt: KeyboardEvent) => {
  //     if (evt.key === 'Escape') {
  //       evt.preventDefault();
  //     }

  //     document.addEventListener('keydown', onEscKeyDown);

  //     return () => {
  //       document.removeEventListener('keydown', onEscKeyDown);
  //     };
  //   }
  // }, []);

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => {}}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpened ? ' places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortType) => (
          <li
            className={`places__option${sortType === activeOfferSort ? ' places__option--active' : ''}`}
            key={sortType}
            onClick={() => {
              setSort(sortType);
              setFilter(!isFilter);
            }}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}
