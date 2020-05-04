import React from 'react';
import NumericLabel from 'react-pretty-numbers';

import './GlobalDash.css';
import MyBar from './bar';
import PieGlobalStats from './pie';
import MyLine from './line';
import { calculateRates } from '../calculators/rates';
import { calculateTotalValue, calculateTotalForEachDay } from '../calculators/total';

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

const lineDataExample = {
    labels: ['05/01', '06/01', '07/01'],
    datasets: [
      {
        label: 'Deaths',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80]
      },
      {
        label: 'Recovered',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [70, 30, 100]
      }
    ]
};

export default class GlobalDash extends React.Component {

    render() {
        const rates = calculateRates(this.props.dataCache);
        const totals = calculateTotalValue(this.props.dataCache);
        const totalActive = totals.TotalConfirmed - (totals.TotalRecovered + totals.TotalDeaths);
        const totalPerDay = calculateTotalForEachDay(this.props.dataCache);
        
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
                '#6BFF6E',
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
        const lineData = {
            labels: totalPerDay.days,
            datasets: [
              {
                label: 'Infected',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#78A5FF',
                borderWidth: 2,
                data: totalPerDay.Infected
              },
              {
                label: 'Active',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#FFCD5E',
                borderWidth: 2,
                data: totalPerDay.Active
              },
              {
                label: 'Recovered',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#6BFF6E',
                borderWidth: 2,
                data: totalPerDay.Recovered
              },
              {
                label: 'Deaths',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#FF91C5',
                borderWidth: 2,
                data: totalPerDay.Deaths
              }
            ]
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
                    <div className="Body-5-cell YellowText">
                        <NumericLabel params={optionYel}>{rates.ConfirmedRate}</NumericLabel>
                        <br /><br />New infected persons today
                    </div>
                    <div className="Body-5-cell GreenText">
                        <NumericLabel params={optionGreen}>{rates.RecoveredRate}</NumericLabel>
                        <br /><br />Recovered patients today
                    </div>
                    <div className="Body-5-cell RedText">
                        <NumericLabel params={optionRed}>{rates.DeathsRate}</NumericLabel>
                        <br /><br />People died today
                    </div>
                </div>

                <div className="SideMargin">
                    <MyLine data={lineData} height={400}/>
                </div>

                <div className="Body-row">
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={250}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={250}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={250}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataExample} height={250}/>
                    </div>
                </div>
            </div>
        );
    }
}

const optionYel = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'YellowText']
    };
const optionRed = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'RedText']
    };
const optionGreen = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'GreenText']
    };
const optionBlue = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'BlueText']
    };