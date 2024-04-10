import { store } from '../store';

type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {AppDispatch, RootStore};
