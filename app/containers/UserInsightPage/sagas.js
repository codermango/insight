import userInsightMoviesData from 'containers/UserInsightMovies/sagas';
import userInsightGenresData from 'containers/UserInsightGenres/sagas';
import userInsightInteractionsData from 'containers/UserInsightInteractions/sagas';

// Bootstrap sagas
export default [
  ...userInsightMoviesData,
  ...userInsightGenresData,
  ...userInsightInteractionsData,
];
