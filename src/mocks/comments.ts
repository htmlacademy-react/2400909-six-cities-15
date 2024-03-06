import { Comment } from '../types/comment';

//export const AVATAR_URL = process.env.REACT_APP_API_GENERATE_AVATAR_SERVICE;

export const comments: Comment[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: './img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  }
];
