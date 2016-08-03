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
      <DataCard data={data[0]} />
      <DataCard data={data[1]} unit="%" isReverseColor={Boolean(true)} />
      <DataCard data={data[2]} unit="SEK" />
      <DataCard data={data[3]} unit="MIN" />
      <DataChartCard />
    </div>
  );
}

KpiPanel.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default KpiPanel;
