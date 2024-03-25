const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] satisfies Record<SortOption, string>;

const enum SortOption {
  Popular = 0,
  PriceLowToHigh = 1,
  PriceHighToLow = 2,
  TopRatedFirst = 3
}

export {SORT_OPTIONS, SortOption};
