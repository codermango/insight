/**
*
* ChartLabel
*
*/

import React from 'react';
import { VictoryLabel } from 'victory';


function ChartLabel(props) {
  const group = (
    <g>
      <VictoryLabel {...props} />
    </g>
  );
  return props.active ? group : null;
}

ChartLabel.propTypes = {
  active: React.PropTypes.bool,
};

export default ChartLabel;
