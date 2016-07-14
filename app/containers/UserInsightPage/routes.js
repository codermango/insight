import UserInsightMovies from 'containers/UserInsightMovies';
import UserInsightGenres from 'containers/UserInsightGenres';
import UserInsightInteractions from 'containers/UserInsightInteractions';

const childRoutes = [
  {
    path: 'movies',
    component: UserInsightMovies,
  },
  {
    path: 'genres',
    component: UserInsightGenres,
  },
  {
    path: 'interactions',
    component: UserInsightInteractions,
  },
];

export default childRoutes;
