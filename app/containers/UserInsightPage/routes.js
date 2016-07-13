import UserInsightMovies from 'containers/UserInsightMovies';
import UserInsightGenres from 'containers/UserInsightGenres';
import UserInsightTransactions from 'containers/UserInsightTransactions';

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
    path: 'transactions',
    component: UserInsightTransactions,
  },
];

export default childRoutes;
