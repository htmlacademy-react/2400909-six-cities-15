import { useEffect, useState } from 'react';
import { SortOption, SORT_OPTIONS } from './const';

type SortProps = {
  current: SortOption;
  setter: (option: SortOption) => void;
}

export default function Sort({current, setter}: SortProps): JSX.Element {
  const [isOpened, setOpened] = useState(false);

  useEffect(() => {
    const onEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
      }

      document.addEventListener('keydown', onEscKeyDown);

      return () => {
        document.removeEventListener('keydown', onEscKeyDown);
      };
    }
  }, []);

  const selectedOption = SORT_OPTIONS[current];

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => {}}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpened((prev) => !prev)}
      >

        {selectedOption}

        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpened ? ' places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option, index) => (
          <li
            className={'places__option places__option--active'}
            key={option}
            onClick={() => setter(index)}
            tabIndex={0}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
