import { RootStore } from "../../types/store";

const selectOffers = (state: RootStore) => state.offers;
const selectCity = (state: RootStore) => state.city;

export {selectCity, selectOffers};
