import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector,useStore } from "react-redux";
import { store } from "../../store";
import { AppDispatch, RootStore } from "../../types/store";

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
const useAppStore: () => typeof store = useStore;

export {useAppDispatch, useAppSelector, useAppStore};
