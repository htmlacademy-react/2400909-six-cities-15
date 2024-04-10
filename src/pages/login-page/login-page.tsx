import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../components/hooks/store';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-action';
import AppRoute from '../../components/const';
import { loginErrorHandle } from '../../services/login-error-handle';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password =  passwordRef.current.value;

      if (/[A-Za-z]/.test(password) && /\d/.test(password)) {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: password,
        }));
      } else {
          const errorMessage = 'The password should includes min one number & one letter';
          loginErrorHandle(errorMessage);
      }
    }
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <Helmet>
            <title>Страница авторизации</title>
          </Helmet>
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={loginRef}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              onClick={() => navigate(AppRoute.Root)}
              className="login__submit form__submit button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
