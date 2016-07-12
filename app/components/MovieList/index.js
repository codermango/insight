/**
*
* MovieList
*
*/

import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { VictoryLabel } from 'victory';
import BarComponent from 'components/BarComponent';

import styles from './styles.css';

function MovieList(props) {
  const { topMovies, sortBy } = props;
  if (!topMovies) {
    return (
      <div>No movie list</div>
    );
  }
  const maxDomain = Math.max(...topMovies.map(movie => movie[sortBy]));
  return (
    <div className={styles.movieList}>
      <List style={{ overflowY: 'auto', cursor: 'default' }}>
        {topMovies.map(movie =>
          <ListItem
            key={movie.vionelID}
            disabled primaryText={movie.name}
            secondaryText={
              <BarComponent
                horizontal
                height={50}
                padding={0}
                domain={{ y: [0, 2], x: [0, maxDomain] }}
                data={[{ x: 1, y: movie[sortBy] }]}
              >
                <VictoryLabel
                  x={10}
                  y={25}
                  textAnchor="start"
                  verticalAnchor="middle"
                  text={`${movie[sortBy]}`}
                  style={{ fill: '#000', fontSize: 20 }}
                />
              </BarComponent>
            }
            style={{ color: '#FFF', fontSize: 12 }}
            leftAvatar={
              <img
                src={movie.thumbnailUrl}
                width={40}
                alt={movie.name}
              />
            }
          />
        )}
      </List>
    </div>
  );
}

MovieList.propTypes = {
  topMovies: React.PropTypes.array,
  sortBy: React.PropTypes.string,
};

export default MovieList;
