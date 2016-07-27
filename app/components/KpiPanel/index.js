/**
*
* KpiPanel
*
*/

import React from 'react';

import styles from './styles.css';

import DataCard from 'components/DataCard';

function KpiPanel(props) {
  const { data } = props;
  return (
    <div className={styles.kpiPanel}>
      {data ?
        data.map((item, i) => (
          <div key={i} className={styles.dataCardWrapper}>
            <DataCard data={item} />
          </div>
        ))
        :
        ''
      }
    </div>
  );
}

KpiPanel.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default KpiPanel;
