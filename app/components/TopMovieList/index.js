/**
*
* TopMovieList
*
*/

import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { VictoryLabel } from 'victory';
import BarComponent from 'components/BarComponent';

import styles from './styles.css';


function TopMovieList(props) {
  if (!props.topMovies) {
    return (
      <div>No movie list</div>
    );
  }
  const maxDomain = Math.max(...props.topMovies.map(movie => movie.numUsers));
  return (
    <div className={styles.topMovieList}>
      <List style={{ overflowY: 'auto', cursor: 'default' }}>
        {props.topMovies.map(movie =>
          <ListItem
            key={movie.vionelID}
            disabled primaryText={movie.name}
            secondaryText={
              <BarComponent
                horizontal
                height={50}
                padding={0}
                domain={{ y: [0, 2], x: [0, maxDomain] }}
                data={[{ x: 1, y: movie.numUsers }]}
              >
                <VictoryLabel
                  x={10}
                  y={25}
                  textAnchor="start"
                  verticalAnchor="middle"
                  text={`${movie.numUsers} viewers`}
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

TopMovieList.propTypes = {
  topMovies: React.PropTypes.array,
};

export default TopMovieList;
