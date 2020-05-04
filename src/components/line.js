import React from 'react';
import {Line} from 'react-chartjs-2';

export default class MyLine extends React.Component {

  render() {
    return (
      <div>
        <Line
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