/**
*
* DataChartCard
*
*/

import React from 'react';

import styles from './styles.css';

import DonutComponent from 'components/DonutComponent';

function DataChartCard(props) {
  const colors = ['#C5680C', '#1376C4', '#02C28F', '#8606C8', '#C409BC'];
  const { data } = props;
  data.data.sort((a, b) => a.y < b.y);

  return (
    <div className={styles.dataChartCard}>
      <div className={styles.textSection}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.items}>
          {data.data ?
            data.data.map((item, i) => (
              <div key={i} className={styles.item} style={{ color: colors[i] }}>{item.x}</div>
            ))
            :
            ''
          }
        </div>
      </div>
      <div className={styles.chartSection}>
        <DonutComponent />
      </div>
    </div>
  );
}

DataChartCard.defaultProps = {
  // data: [
  //   { x: 'iPad', y: 3 },
  //   { x: 'iPhone', y: 5 },
  //   { x: 'Samsung Smart TV', y: 4 },
  //   { x: 'PC & Mac', y: 2 },
  //   { x: 'Android', y: 1 },
  // ],
};

DataChartCard.propTypes = {
  data: React.PropTypes.object,
};

export default DataChartCard;
