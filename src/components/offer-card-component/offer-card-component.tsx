import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../hooks/store';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { store } from '../../store';
import { saveFavoritesOffersAction } from '../../store/api-action';

type Props = {
  offer: Offer;
  block: string;
  setActiveId?: (str: string | undefined) => void;
}

function OfferCardComponent({offer, block, setActiveId}: Props): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const navigate = useNavigate();
  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      store.dispatch(saveFavoritesOffersAction({
        id: offer.id,
        isFavorite: offer.isFavorite,
      }));
    }
  };

  const {isPremium, previewImage, price, rating, title, type, isFavorite} = offer;
  const offerPath = `/offer/${offer.id}`;
  const ratingStatus = Math.round(rating * 20);

  const handleMouseEnter = () => {
    if (setActiveId) {
      setActiveId(offer.id);
    }
  };

  const handleMouseLeave = () => {
    if (setActiveId) {
      setActiveId(undefined);
    }
  };

  return (
    <article className={`${block}__card place-card`}
      onMouseEnter = {handleMouseEnter}
      onMouseLeave = {handleMouseLeave}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null }
      <div className={`${block}__image-wrapper place-card__image-wrapper`} >
        <Link to={offerPath}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${isFavorite ? ' place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingStatus}}></span>
            <span className="visually-hidden">{ratingStatus}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPath}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCardComponent);
