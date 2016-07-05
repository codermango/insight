/**
*
* BarComponent
*
*/

import React from 'react';
import { VictoryBar } from 'victory';


function BarComponent(props) {
  const barStyles = {
    data: {
      fill: '#76FF03',
      width: 26,
      strokeLinecap: 'round',
    },
  };
  return (
    <div>
      <VictoryBar
        horizontal={props.horizontal}
        height={props.height}
        padding={props.padding}
        domain={props.domain}
        data={props.data}
        style={barStyles}
        labelComponent={props.children}
      />
    </div>
  );
}

BarComponent.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.bool,
  ]),
  height: React.PropTypes.number,
  horizontal: React.PropTypes.bool,
  padding: React.PropTypes.number,
  domain: React.PropTypes.object,
  data: React.PropTypes.array,
};

export default BarComponent;
