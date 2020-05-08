import React from 'react';
import {Bar} from 'react-chartjs-2';
import Numeral from 'numeral';

export default class MyBar extends React.Component {

  render() {
    return (
      <div>
        <Bar
          data={this.props.data}
          height={this.props.height}
          options={{
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return ' ' + data.datasets[tooltipItem.datasetIndex].label + ': ' + Numeral(value).format('0.000a');
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              position: 'bottom'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      callback: function (value) {
                          return Numeral(value).format('0.0a');
                      }
                  }
              }]
            }
          }}
        />
      </div>
    );
  }
}