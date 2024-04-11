import { AppRoute, AuthorizationStatus, MAX_COUNT_COMMENTS } from '../../components/const/const';
import ReviewComponent from '../../components/review-component';
import { Navigate, useParams } from 'react-router-dom';
import { Map } from '../../components/map/map';
import OfferCardComponent from '../../components/offer-card-component';
import { useAppDispatch, useAppSelector } from '../../components/hooks/store';
import { useEffect } from 'react';
import { fetchCommentsAction, fetchFavoritesOffersAction, fetchNearbyOffersAction, fetchOfferIdAction } from '../../store/api-action';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import MemoCommentItem from './comment-item';
import { Comment } from '../../types/comment';

function OfferPage(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferIdAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchFavoritesOffersAction());
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id, dispatch]);

  const extendedOffer = useAppSelector((state) => state.offers.offer);
  const nearbyOffer = useAppSelector((state) => state.offers.nearbyOffers);
  const userComments = useAppSelector((state) => state.user.comments);
  const isOfferLoading = useAppSelector((state) => state.loading.isCurrentOfferDataLoading);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const sortingComments = [...userComments].sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COUNT_COMMENTS);


  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (!extendedOffer) {
    return <Navigate to={AppRoute.NotFoundPage} replace/>;
  }

  const {images, isPremium, title, rating, type, price, bedrooms, goods, host, maxAdults, description} = extendedOffer;
  const ratingStatus = Math.round(rating * 20);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img className="offer__image" src={image} alt="Photo studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              isPremium ?
                (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                ) : null
            }
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
                {bedrooms} {(bedrooms > 1) ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} {(maxAdults > 1) ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) => (
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
                <p className="offer__text" key={description}>{description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{userComments.length}</span></h2>
              <ul className="reviews__list">
                {sortingComments
                  .map(
                    (comment) => <MemoCommentItem comments={comment} key={comment.id}/>
                  )}
              </ul>

              {authorizationStatus === AuthorizationStatus.Auth ? (
                <ReviewComponent />
              ) : null }

            </section>
          </div>
        </div>
        <Map
          className="offer"
          activeOfferId={extendedOffer.id}
          offers={[...nearbyOffer.slice(0, 3), extendedOffer]}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearbyOffer.slice(0, 3).map((offer) => (
              <OfferCardComponent key={offer.id} offer={offer} block="near-places" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
