import React from 'react';
import './GlobalDash.css';
import BarExample from './bar';
import {Pie} from 'react-chartjs-2';

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

const pieDataExample = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#c0c0c0',
		'#c0c0c0',
		'#c0c0c0'
		]
	}]
};

export default class GlobalDash extends React.Component {
    render() {
        return (
            <div className="Body">
                <div className="Body-title">
                    Global Statistics
                </div>

                <div className="Body-row">
                    <div className="Body-4-cell">
                        <Pie data={pieDataExample} height={200} options={{maintainAspectRatio: false}}/>
                    </div>
                    <div className="Body-4-cell">
                        Infected rate for the last 3 days: 
                    </div>
                    <div className="Body-4-cell">
                        Death rate for the last 3 days: 
                    </div>
                    <div className="Body-4-cell">
                        Recovered rate for the last 3 days:
                    </div>
                </div>

                <div className="Body-row">
                    <div className="Body-3-cell">
                        <BarExample data={barDataExample} height={200}/>
                    </div>
                    <div className="Body-3-cell">
                        <BarExample data={barDataExample} height={200}/>
                    </div>
                    <div className="Body-3-cell">
                        <BarExample data={barDataExample} height={200}/>
                    </div>
                </div>
            </div>
        );
    }
}