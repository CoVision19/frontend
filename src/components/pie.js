import React from 'react';
import {Pie} from 'react-chartjs-2';

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
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }
          }}
        />
      </div>
    );
  }
}