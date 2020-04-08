import React from 'react';
import './Body.css';
import BarExample from './bar';

const barDataExample = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
};

export default class Body extends React.Component {
    render() {
        return (
            <div className="Body">
                <div className="main chart-wrapper">
                    <BarExample data={barDataExample} height={150}/>
                </div>
                <div className="sub chart-wrapper">
                    <BarExample data={barDataExample} height={150}/>
                </div>
                <div className="sub chart-wrapper">
                    <BarExample data={barDataExample} height={150}/>
                </div>
                <div className="sub chart-wrapper">
                    <BarExample data={barDataExample} height={150}/>
                </div>
            </div>
        );
    }
}