import { store } from "../store"
import { setError } from "../store/action"
import { clearErrorAction } from "../store/api-action";

export const loginErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
}
