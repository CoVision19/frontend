import React from 'react';
import './GlobalDash.css';
import BarExample from './bar';
import PieGlobalStats from './pie';
import {calculateRates} from '../calculators/rates';
import {calculateTotalValue} from '../calculators/total';

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

export default class GlobalDash extends React.Component {

    render() {
        const rates = calculateRates(this.props.dataCache);
        const totals = calculateTotalValue(this.props.dataCache);
        const totalActive = totals.TotalConfirmed - (totals.TotalRecovered + totals.TotalDeaths);
        const pieTotalsData = {
            labels: [
                'Deaths',
                'Recovered',
                'Active'
            ],
            datasets: [{
                data: [totals.TotalDeaths, totals.TotalRecovered, totalActive],
                backgroundColor: [
                '#FF91C5',
                '#78A5FF',
                '#FFCD5E'
                ],
                hoverBackgroundColor: [
                '#c0c0c0',
                '#c0c0c0',
                '#c0c0c0'
                ],
                borderWidth: 0,
            }]
        };

        return (
            <div className="Body">
                <div className="Body-title">
                    Global Statistics
                </div>
                <div className="Body-row">
                    <div className="Body-4-cell">
                        <PieGlobalStats data={pieTotalsData} height={200}/>
                    </div>
                    <div className="Body-4-cell">
                        Total Confirmed:
                        &nbsp;{totals.TotalConfirmed.toLocaleString()}
                    </div>
                    <div className="Body-4-cell">
                        Infected rate for the last 3 days: 
                        &nbsp;{rates.ConfirmedRate.toLocaleString()}
                    </div>
                    <div className="Body-4-cell">
                        Death rate for the last 3 days: 
                        &nbsp;{rates.DeathsRate.toLocaleString()}
                    </div>
                    <div className="Body-4-cell">
                        Recovered rate for the last 3 days:
                        &nbsp;{rates.RecoveredRate.toLocaleString()}
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