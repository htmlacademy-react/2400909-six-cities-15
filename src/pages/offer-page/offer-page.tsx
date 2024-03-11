import { getAuthorizationStatus } from '../../authorizationStatus';
import { AppRoute, AuthorizationStatus } from '../../components/const/const';
import { getOfferById } from '../../mocks/extended-offers';
import { Comment } from '../../types/comment';
import ReviewComponent from '../../components/review-component';
import { Navigate, useParams } from 'react-router-dom';
import { Map } from '../../components/map/map';
import OfferCardComponent from '../../components/offer-card-component';
import { extendedOffers } from '../../mocks/extended-offers';
import { getNearOffers } from '../../components/const/const';

type Props = {
  comments: Comment[];

}

function OfferPage({comments}: Props): JSX.Element {
  const {id: offerId} = useParams();
  const currentOffer = getOfferById(offerId);
  const foundOffer = extendedOffers.find((item) => item.id.toString() === offerId);
  const authorizationStatus = getAuthorizationStatus();
  const {images, isPremium, title, rating, type, price, bedrooms, goods, host, maxAdults} = currentOffer;
  const {user, comment} = comments[0];
  const ratingStatus = rating * 20;

  const offerPage = {...extendedOffers, ...foundOffer};
  const nearOffers = getNearOffers(offerPage);
  const nearOffersPlusCurrent = [offerPage, ...nearOffers];

  if (!currentOffer) {
    return <Navigate to={AppRoute.NotFoundPage} replace/>
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>{isPremium}</span>
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${ratingStatus}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} {(bedrooms > 1) ? 'Bedrooms': 'Bedroom'}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} {(maxAdults > 1) ? 'adults': 'adult'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((good) => (
                  <li key={good} className="offer__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {host.name}
                </span>
                {
                  (host.isPro) ? (
                    <span className="offer__user-status">
                      Pro
                    </span>) : null
                }
              </div>
              <div className="offer__description">
                {
                  currentOffer.description.map((description) =>
                    (<p className="offer__text" key={description}>{description}</p>)
                  )
                }
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                <li className="reviews__item">
                  <div className="reviews__user user">
                    <div className="reviews__avatar-wrapper user__avatar-wrapper">
                      <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                    </div>
                    <span className="reviews__user-name">
                      {user.name}
                    </span>
                  </div>
                  <div className="reviews__info">
                    <div className="reviews__rating rating">
                      <div className="reviews__stars rating__stars">
                        <span style={{width: `${ratingStatus}%`}}></span>
                        <span className="visually-hidden">{rating}</span>
                      </div>
                    </div>
                    <p className="reviews__text">
                      {comment}
                    </p>
                    <time className="reviews__time" dateTime={'2019-04-24'}>April 2019</time>
                  </div>
                </li>
              </ul>

              {authorizationStatus === AuthorizationStatus.Auth ? (
                <ReviewComponent />
              ) : null }

            </section>
          </div>
        </div>
        <Map
         className="offer__map"
         offers={nearOffersPlusCurrent}
         city={offerPage.city}
         activeOfferId={offerPage.id}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers.map((offer) => (
              <OfferCardComponent key={offer.id} offer={offer} block="near-places" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
