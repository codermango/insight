import userInsightMoviesData from 'containers/UserInsightMovies/sagas';
import userInsightGenresData from 'containers/UserInsightGenres/sagas';

// Bootstrap sagas
export default [
  ...userInsightMoviesData,
  ...userInsightGenresData,
];
