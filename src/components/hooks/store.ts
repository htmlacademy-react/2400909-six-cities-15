import { TypedUseSelectorHook,
  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../types/store';

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export {useAppDispatch, useAppSelector};
