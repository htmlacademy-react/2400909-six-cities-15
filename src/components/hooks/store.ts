import { TypedUseSelectorHook,
  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../types/store';

const useAppDispatch = () => useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export {useAppDispatch, useAppSelector};
