import React from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart} from 'react-chartjs-2';
import Numeral from 'numeral';

Chart.defaults.global.defaultFontColor = "#fff";

export default class PieGlobalStats extends React.Component {

  render() {
    return (
      <div>
        <Pie
          data={this.props.data}
          height={this.props.height}
          options={{
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return ' ' + Numeral(value).format('0.000a');
                    }
                }
            },
            legend: {
              position: 'bottom'
            }
          }}
        />
      </div>
    );
  }
}