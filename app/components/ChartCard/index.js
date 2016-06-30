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
    const { title, description, loading } = this.props;
    const bodyHeight = this.state.dimension.height > 0 ? this.state.dimension.height : 100;
    return (
      <div className={styles.chartCard}>
        <div className={styles.header}>
          <h3 className={styles.chartHeader}>{title}</h3>
          <span className={styles.chartDescription}>{description}</span>
        </div>
        <div className={styles.body} ref="body" style={{ height: bodyHeight }}>
          {loading ? <div className={styles.loading}><CircularProgress /></div> : <div {...this.props} />}
        </div>
      </div>
    );
  }
}

export default ChartCard;
