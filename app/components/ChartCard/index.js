/**
*
* ChartCard
*
*/

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './styles.css';

class ChartCard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    stackDescription: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    loading: React.PropTypes.bool,
  }

  static defaultProps = {
    title: 'Chart Title',
    description: 'Chart description',
  }

  constructor(props) {
    super(props);
    this.state = {
      dimension: false,
    };

    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    this.setState({ dimension: this.refs.body.getBoundingClientRect() });
  }

  render() {
    const { title, description, loading, stackDescription } = this.props;
    const bodyHeight = this.state.dimension.height > 0 ? this.state.dimension.height : 100;
    return (
      <div className={styles.chartCard}>
        <div className={styles.header}>
          <h3 className={styles.chartHeader}>{title}</h3>
          <span className={styles.chartDescription}>{description}</span>
          {stackDescription ?
            <div style={{ fontSize: 10, marginTop: '5px' }}>
              {stackDescription.map(stack =>
                <div key={stack.name} style={{ display: 'inline-block', position: 'relative', padding: '0 5px' }}>
                  <span style={{ width: '5px', height: '5px', backgroundColor: stack.color, position: 'absolute', top: '5px', borderRadius: '5px' }}></span>
                  <span style={{ marginLeft: '8px' }}>{stack.name}</span>
                </div>
              )}
            </div>
            :
            ''
          }
        </div>
        <div className={styles.body} ref="body" style={{ height: bodyHeight }}>
          {loading ? <div className={styles.loading}><CircularProgress /></div> : <div {...this.props} />}
        </div>
      </div>
    );
  }
}

export default ChartCard;
