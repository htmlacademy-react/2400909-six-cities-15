import {Navigate} from 'react-router-dom';
import AppRoute from '../const';
import { AuthorizationStatus } from '../const/const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, isReverse, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} replace />
  );
}

export default PrivateRoute;
