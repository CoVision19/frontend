import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class MyBar extends React.Component {

  render() {
    return (
      <div>
        <Bar
          data={this.props.data}
          height={this.props.height}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}