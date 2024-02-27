import { Link } from 'react-router-dom';
import { Fragment } from 'react';

function NotFoundPage(): JSX.Element {
  return (
    <Fragment>
      <h1>
        404.
        <br />
        <small>Page is not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </Fragment>
  );
}

export default NotFoundPage;
