import { Comment } from '../../types/comment';
import { formatDate, formatDateTime } from '../../components/const/utils';
import { memo } from 'react';

type TProps = {
  comments: Comment;
}

function CommentItem({comments}: TProps): JSX.Element {
  const {id, date, user, comment, rating} = comments;
  const ratingStatus = Math.round(rating * 20);

  return (
    <li key={id} className="reviews__item">
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
        <time className="reviews__time" dateTime={formatDateTime(date)}>{formatDate(date)}</time>
      </div>
    </li>
  );
}

const MemoCommentItem = memo(CommentItem);
export default MemoCommentItem;
