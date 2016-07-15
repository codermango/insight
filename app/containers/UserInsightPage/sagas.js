import userInsightMoviesData from 'containers/UserInsightMovies/sagas';
import userInsightGenresData from 'containers/UserInsightGenres/sagas';
import userInsightTransactionsData from 'containers/UserInsightTransactions/sagas';
import userInsightInteractionsData from 'containers/UserInsightInteractions/sagas';

// Bootstrap sagas
export default [
  ...userInsightMoviesData,
  ...userInsightGenresData,
  ...userInsightTransactionsData,
  ...userInsightInteractionsData,
];
