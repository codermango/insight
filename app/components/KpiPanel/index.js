/**
*
* KpiPanel
*
*/

import React from 'react';

import styles from './styles.css';

import DataCard from 'components/DataCard';
import DataChartCard from 'components/DataChartCard';

function KpiPanel(props) {
  const { data } = props;
  return (
    <div className={styles.kpiPanel}>
      <div className={styles.dataCardWrapper}>
        <DataCard data={data[0]} />
      </div>
      <div className={styles.dataCardWrapper}>
        <DataCard data={data[1]} unit="%" isReverseColor={Boolean(true)} />
      </div>
      <div className={styles.dataCardWrapper}>
        <DataCard data={data[2]} unit="SEK" />
      </div>
      <div className={styles.dataCardWrapper}>
        <DataCard data={data[3]} unit="MIN" />
      </div>
      <div className={styles.dataCardWrapper}>
        <DataChartCard />
      </div>
    </div>
  );
}

KpiPanel.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default KpiPanel;
