/*
 *
 * AnalysisPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  selectActiveViewers,
  selectChurn,
  selectAverageAmount,
  selectAverageViewTime,
  selectPersonasActiveViewers,
} from './selectors';
import { createStructuredSelector } from 'reselect';
import styles from './styles.css';
import { fetchAnalysis } from './actions';

import KpiPanel from 'components/KpiPanel';
import PersonasPanel from 'components/PersonasPanel';

import poster1 from './images/gj282Pniaa78ZJfbaixyLXnXEDI.jpg';
import poster2 from './images/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
import poster3 from './images/tSFBh9Ayn5uiwbUK9HvD2lrRgaQ.jpg';
import poster4 from './images/1Rs4oQs5wONsWAZoqvOo1x9CjPC.jpg';
import poster5 from './images/5N20rQURev5CNDcMjHVUZhpoCNC.jpg';
import poster6 from './images/6FxOPJ9Ysilpq0IgkrMJ7PubFhq.jpg';
import poster7 from './images/9KQX22BeFzuNM66pBA6JbiaJ7Mi.jpg';
import poster8 from './images/aBBQSC8ZECGn6Wh92gKDOakSC8p.jpg';
import poster9 from './images/cGOPbv9wA5gEejkUN892JrveARt.jpg';
import poster10 from './images/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg';
import poster11 from './images/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg';
import poster12 from './images/z09QAf8WbZncbitewNk6lKYMZsh.jpg';
import happySmiley from './images/happy_smiley.png';
import unhappySmiley from './images/unhappy_smiley.png';


export class AnalysisPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchAnalysis: React.PropTypes.func,
    activeViewers: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    churn: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    averageAmount: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    averageViewTime: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    personasActiveViewers: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  };

  componentWillMount() {
    if (!this.props.activeViewers.get('data')) {
      this.props.fetchAnalysis();
    }
  }
  render() {
    const {
      activeViewers,
      churn,
      averageAmount,
      averageViewTime,
      personasActiveViewers,
    } = this.props;
    if (!activeViewers.get('data')) {
      return <div></div>;
    }

    const data = {
      kpi: [
        { title: 'Active Viewers', number: activeViewers.get('data').cur_value, change: activeViewers.get('data').change_rate },
        { title: 'Churn', number: churn.get('data').cur_value, change: churn.get('data').change_rate },
        { title: 'Average Amount', number: averageAmount.get('data').cur_value, change: averageAmount.get('data').change_rate },
        { title: 'Average View Time', number: averageViewTime.get('data').cur_value, change: averageViewTime.get('data').change_rate },
        { title: 'ARPU', number: 37, change: 7 },
      ],
      personas: [
        {
          percentage: personasActiveViewers.get('data').persona0,
          status: `${happySmiley}`,
          arpu: { data: 12.5, change: 12.3 },
          avgViewingTime: { data: 54.5, change: -9.8 },
          posters: [`${poster1}`, `${poster2}`, `${poster3}`],
          description: 'Mainstream action and adventure, late night movie watchers. Prefer device Arris VIP 1113',
        },

        {
          percentage: personasActiveViewers.get('data').persona1,
          status: `${happySmiley}`,
          arpu: { data: 67.5, change: 12.3 },
          avgViewingTime: { data: 54.5, change: -9.8 },
          posters: [`${poster4}`, `${poster5}`, `${poster6}`],
          description: 'Mainstream action and adventure, late night movie watchers. Prefer device Arris VIP 1113',
        },

        {
          percentage: personasActiveViewers.get('data').persona2,
          status: `${unhappySmiley}`,
          arpu: { data: 27.5, change: -52.3 },
          avgViewingTime: { data: 54.5, change: -9.8 },
          posters: [`${poster7}`, `${poster8}`, `${poster9}`],
          description: 'Mainstream action and adventure, late night movie watchers. Prefer device Arris VIP 1113',
        },

        {
          percentage: personasActiveViewers.get('data').persona3,
          status: `${happySmiley}`,
          arpu: { data: 29.5, change: 43.3 },
          avgViewingTime: { data: 12.9, change: -9.8 },
          posters: [`${poster10}`, `${poster11}`, `${poster12}`],
          description: 'Mainstream action and adventure, late night movie watchers. Prefer device Arris VIP 1113',
        },

      ],
    };

    const { kpi, personas } = data;
    return (
      <div className={styles.analysisPage}>
        <KpiPanel data={kpi} />
        <PersonasPanel data={personas} />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  activeViewers: selectActiveViewers(),
  churn: selectChurn(),
  averageAmount: selectAverageAmount(),
  averageViewTime: selectAverageViewTime(),
  personasActiveViewers: selectPersonasActiveViewers(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAnalysis: () => dispatch(fetchAnalysis()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisPage);
