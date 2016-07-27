/**
*
* DataCard
*
*/

import React from 'react';
import CountUp from 'react-countup';

import styles from './styles.css';

function DataCard(props) {
  const { data } = props;
  const decimals = Number.isInteger(data.number) ? 0 : 2;
  const backgroundColor = data.change > 0 ? '#449C0E' : '#E7505A';
  const description = data.change > 0 ? `Increase ${data.change}%` : `Decrease ${Math.abs(data.change)}%`;
  return (
    <div className={styles.dataCard} style={{ backgroundColor }}>
      <h4 className={styles.title}>{data.title}</h4>
      <div className={styles.number}>
        <CountUp
          start={0}
          end={Number(data.number)}
          separator=","
          duration={1}
          decimals={decimals}
          useGrouping={Boolean(true)}
        />
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}

DataCard.defaultProps = {
  data: {
    title: 'Active Users',
    number: 342434,
  },
};

DataCard.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default DataCard;
