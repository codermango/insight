/**
*
* DataCard
*
*/

import React from 'react';
import CountUp from 'react-countup';

import styles from './styles.css';

function DataCard(props) {
  const { data, unit, isReverseColor } = props;
  const decimals = Number.isInteger(data.number) ? 0 : 2;
  let descriptionColor;
  if (isReverseColor) {
    descriptionColor = data.change < 0 ? '#C41B10' : '#039800';
  } else {
    descriptionColor = data.change > 0 ? '#C41B10' : '#039800';
  }
  const description = data.change > 0 ? `INCREASE +${data.change.toFixed(2)}%` : `DECREASE ${data.change.toFixed(2)}%`;
  return (
    <div className={styles.dataCard}>
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
        <span className={styles.unit}>{unit}</span>
      </div>
      <div className={styles.description} style={{ color: descriptionColor }}>
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
  unit: '',
  isReverseColor: false,
};

DataCard.propTypes = {
  data: React.PropTypes.object.isRequired,
  unit: React.PropTypes.string,
  isReverseColor: React.PropTypes.bool,
};

export default DataCard;
