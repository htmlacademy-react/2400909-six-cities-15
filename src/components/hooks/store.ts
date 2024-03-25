import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector,useStore } from 'react-redux';
import { store } from '../../store';
import { AppDispatch, RootStore } from '../../types/store';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
const useAppStore: () => typeof store = useStore;

const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

export {useAppDispatch, useAppSelector, useAppStore, useActionCreators};
