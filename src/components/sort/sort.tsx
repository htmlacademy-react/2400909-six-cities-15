import { useState } from 'react';
import { SortType } from './const';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { changeSortType } from '../../store/action';

export default function Sort(): JSX.Element {
  const [isOpened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector((state) => state.currentSortType);


  return (
    <form className="places__sorting" action="#" method="get" onClick={() => {}}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpened ? ' places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortType) => (
          <li
            className={`places__option${sortType === currentSortType ? ' places__option--active' : ''}`}
            key={sortType}
            onClick={() => {
              setOpened(false);
              dispatch(changeSortType(sortType));
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
