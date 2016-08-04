/**
*
* DonutComponent
*
*/

import React from 'react';
import { VictoryPie } from 'victory';

import styles from './styles.css';

function DonutComponent(props) {
  const colors = ['#C5680C', '#1376C4', '#02C28F', '#8606C8', '#C409BC'];
  const { data } = props;
  data.sort((a, b) => a.y < b.y);
  return (
    <div className={styles.donutComponent}>
      <svg viewBox="0 0 75 75" style={{ height: '5vw' }}>
        <VictoryPie
          standalone={false}
          padding={0}
          height={75}
          width={75}
          innerRadius={30}
          data={data}
          style={{
            labels: { fontSize: 0 },
            data: { stroke: 'none' },
          }}
          colorScale={colors}
        />
      </svg>
      <div className={styles.highlight} style={{ color: colors[0] }}>
        <div className={styles.highlightTitle}>{data[0].x}</div>
        <div className={styles.highlightValue}>{data[0].y}%</div>
      </div>
    </div>
  );
}

DonutComponent.defaultProps = {
  data: [
    { x: 'iPad', y: 3 },
    { x: 'iPhone', y: 5 },
    { x: 'Samsung Smart TV', y: 4 },
    { x: 'PC & Mac', y: 2 },
    { x: 'Android', y: 1 },
  ],
};

DonutComponent.propTypes = {
  data: React.PropTypes.array,
};

export default DonutComponent;
