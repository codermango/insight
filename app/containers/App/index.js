/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import 'sanitize.css/sanitize.css';
import styles from './styles.css';
import SideNav from 'components/SideNav';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  // componentWillMount() {
  //   this.start = Date.now();
  // }

  // componentDidUpdate() {
  //   console.log("start: ",Date.now());
  //   console.log(`Updatedasd in ${Date.now() - this.start}ms`);
  // }

  render() {
    return (
      <div className={styles.insight}>
        <SideNav />
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
