import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type Props = {
  offer: Offer[];
}

function OfferCardComponent({offer}: Props): JSX.Element {
  const [activeCard, setActiveCard] = useState('');
  const {isPremium, previewImage, price, rating, title, type} = offer;
  const offerPath = `/offer/${offer.id}`;
  const ratingStatus = rating / 5 * 100;

  const handleMouseEnter = () => {
    setActiveCard('place-card__bookmark-button--active');
  };

  const handleMouseLeave = () => {
    setActiveCard('');
  };

  return (
    <article className="cities__card place-card"
      onMouseEnter = {handleMouseEnter}
      onMouseLeave = {handleMouseLeave}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null }
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={`place-card__bookmark-button button ${activeCard}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingStatus}}></span>
            <span className="visually-hidden">Rating</span>
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

export default OfferCardComponent;
