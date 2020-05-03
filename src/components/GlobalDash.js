import React from 'react';
import './GlobalDash.css';
import MyBar from './bar';
import PieGlobalStats from './pie';
import { calculateRates } from '../calculators/rates';
import { calculateTotalValue } from '../calculators/total';
import NumericLabel from 'react-pretty-numbers';

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
        let optionYel = {
            'justification': 'L',
            'locales': 'en-US',
            'shortFormat': true,
            'cssClass':['BigNumber', 'YellowText']
            };
        let optionRed = {
            'justification': 'L',
            'locales': 'en-US',
            'shortFormat': true,
            'cssClass':['BigNumber', 'RedText']
            };
        let optionGreen = {
            'justification': 'L',
            'locales': 'en-US',
            'shortFormat': true,
            'cssClass':['BigNumber', 'GreenText']
            };
        let optionBlue = {
            'justification': 'L',
            'locales': 'en-US',
            'shortFormat': true,
            'cssClass':['BigNumber', 'BlueText']
            };
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
                    Whole&nbsp;World
                </div>
                <div className="Body-row">
                    <div className="Body-5-cell">
                        <PieGlobalStats data={pieTotalsData} height={200}/>
                    </div>
                    <div className="Body-5-cell BlueText">
                        <NumericLabel params={optionBlue}>{totals.TotalConfirmed}</NumericLabel>
                        <br /><br />Infected persons in the world
                    </div>
                    <div className="Body-5-cell GreenText">
                        <NumericLabel params={optionGreen}>{rates.ConfirmedRate}</NumericLabel>
                        <br /><br />New infected persons today
                    </div>
                    <div className="Body-5-cell YellowText">
                        <NumericLabel params={optionYel}>{rates.RecoveredRate}</NumericLabel>
                        <br /><br />Recovered patients today
                    </div>
                    <div className="Body-5-cell RedText">
                        <NumericLabel params={optionRed}>{rates.DeathsRate}</NumericLabel>
                        <br /><br />People died today
                    </div>
                </div>

                <div className="Body-row">
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={200}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={200}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={200}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={200}/>
                    </div>
                </div>
            </div>
        );
    }
}