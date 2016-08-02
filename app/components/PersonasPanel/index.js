/**
*
* PersonasPanel
*
*/

import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import styles from './styles.css';

function PersonasPanel(props) {
  const tableStyles = {
    headerColumn: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: '100%',
    },
    rowColumn: {
      textAlign: 'center',
      color: '#8A8A8A',
    },
  };

  const { data } = props;

  return (
    <div className={styles.personasPanel}>
      <Table>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={tableStyles.headerColumn}>%</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>Status</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>ARPU</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>Average View Time</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>Top titles</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>Description</TableHeaderColumn>
            <TableHeaderColumn style={tableStyles.headerColumn}>More Info</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          // showRowHover={true}
          // stripedRows={true}
        >
          {data ?
            data.map((rowData, i) => {
              const arpuChangeTextColor = rowData.arpu.change > 0 ? '#449C0E' : '#E7505A';
              const avgViewingTimeTextColor = rowData.avgViewingTime.change > 0 ? '#449C0E' : '#E7505A';
              return (
                <TableRow key={i}>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    <div className={styles.mainData}>{rowData.percentage}%</div>
                  </TableRowColumn>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    <img className={styles.statusImage} src={rowData.status} alt="img" />
                  </TableRowColumn>

                  <TableRowColumn style={tableStyles.rowColumn}>
                    <div className={styles.mainData}>{rowData.arpu.data} SEK</div>
                    <div className={styles.subData} style={{ color: arpuChangeTextColor }}>({rowData.arpu.change}%)</div>
                  </TableRowColumn>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    <div className={styles.mainData}>{rowData.avgViewingTime.data}min</div>
                    <div className={styles.subData} style={{ color: avgViewingTimeTextColor }}>({rowData.avgViewingTime.change}%)</div>
                  </TableRowColumn>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    {rowData.posters ?
                      rowData.posters.map((posterData, index) => (
                        <img key={index} className={styles.poster} src={posterData} alt="img" />
                      ))
                      :
                      ''
                    }
                  </TableRowColumn>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    <div className={styles.description}>
                      {rowData.description}
                    </div>
                  </TableRowColumn>
                  <TableRowColumn style={tableStyles.rowColumn}>
                    <div className={styles.triangleWrapper}>
                      <div className={styles.triangle}></div>
                    </div>
                  </TableRowColumn>
                </TableRow>
              );
            })
            :
            ''
          }

        </TableBody>
      </Table>
    </div>
  );
}

PersonasPanel.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default PersonasPanel;
