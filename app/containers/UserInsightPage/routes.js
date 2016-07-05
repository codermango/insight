import UserInsightMovies from 'containers/UserInsightMovies';
import UserInsightGenres from 'containers/UserInsightGenres';

const childRoutes = [
  {
    path: 'movies',
    component: UserInsightMovies,
  },
  {
    path: 'genres',
    component: UserInsightGenres,
  },
];

export default childRoutes;
