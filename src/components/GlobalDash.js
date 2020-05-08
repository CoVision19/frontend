import React from 'react';
import NumericLabel from 'react-pretty-numbers';
import './GlobalDash.css';

import MyBar from './bar';
import PieGlobalStats from './pie';
import MyLine from './line';
import { calculateRates } from '../calculators/rates';
import { calculateTotalValue, calculateTotalForEachDay, calculateTotalForTop5 } from '../calculators/total';

export default class GlobalDash extends React.Component {

    componentDidMount() {
        this.props.disableLoadingCallback();
    }

    render() {
        const rates = calculateRates(this.props.dataCache);
        const totals = calculateTotalValue(this.props.dataCache);
        const totalActive = totals.TotalConfirmed - (totals.TotalRecovered + totals.TotalDeaths);
        const totalPerDay = calculateTotalForEachDay(this.props.dataCache);
        const top5 = calculateTotalForTop5(this.props.dataCache, this.props.countryCache)
        
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
        const barDataInfected = {
            labels: top5.countries,
            datasets: [
              {
                label: 'Infected',
                backgroundColor: 'rgba(120,165,255,0.6)',
                borderColor: 'rgba(120,165,255,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(120,165,255,1)',
                hoverBorderColor: 'rgba(120,165,255,1)',
                data: top5.Infected
              }
            ]
        };
        const barDataActive = {
            labels: top5.countries,
            datasets: [
              {
                label: 'Active',
                backgroundColor: 'rgba(255,205,94,0.6)',
                borderColor: 'rgba(255,205,94,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,205,94,1)',
                hoverBorderColor: 'rgba(255,205,94,1)',
                data: top5.Active
              }
            ]
        };
        const barDataDeaths = {
            labels: top5.countries,
            datasets: [
              {
                label: 'Deaths',
                backgroundColor: 'rgba(255,145,197,0.6)',
                borderColor: 'rgba(255,145,197,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,145,197,1)',
                hoverBorderColor: 'rgba(255,145,197,1)',
                data: top5.Deaths
              }
            ]
        };
        const barDataRecovered = {
            labels: top5.countries,
            datasets: [
              {
                label: 'Recovered',
                backgroundColor: 'rgba(107,255,110,0.6)',
                borderColor: 'rgba(107,255,110,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(107,255,110,1)',
                hoverBorderColor: 'rgba(107,255,110,1)',
                data: top5.Recovered
              }
            ]
        };

        return (
            <div className="Body">
                <div className="Body-title">
                    Global&nbsp;Statistics
                </div>
                <div className="Body-row">
                    <div className="Body-5-cell">
                        <PieGlobalStats data={pieTotalsData} height={200}/>
                    </div>
                    <div className="Body-5-cell BlueText">
                        <div className="BigNumber">
                            <NumericLabel params={optionBlue}>{totals.TotalConfirmed}</NumericLabel>
                        </div>
                        <br /><br />Total Infections
                    </div>
                    <div className="Body-5-cell YellowText">
                        <div className="BigNumber">
                            +<NumericLabel params={optionYel}>{rates.ConfirmedRate}</NumericLabel>
                        </div>
                        <br /><br />Infections Today
                    </div>
                    <div className="Body-5-cell GreenText">
                        <div className="BigNumber">
                            +<NumericLabel params={optionGreen}>{rates.RecoveredRate}</NumericLabel>
                        </div>
                        <br /><br />Recoveries Today
                    </div>
                    <div className="Body-5-cell RedText">
                        <div className="BigNumber">
                            +<NumericLabel params={optionRed}>{rates.DeathsRate}</NumericLabel>
                        </div>
                        <br /><br />Deaths Today
                    </div>
                </div>

                <div className="SideMargin">
                    <MyLine data={lineData} height={400}/>
                </div>

                <div className="Body-subtitle">
                    Global Top 5 (sorted by infected)
                </div>
                <div className="Body-row">
                    <div className="Body-4-cell">
                        <MyBar data={barDataInfected} height={300}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataActive} height={300}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataRecovered} height={300}/>
                    </div>
                    <div className="Body-4-cell">
                        <MyBar data={barDataDeaths} height={300}/>
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
    'cssClass':['BigNumber', 'YellowText'],
    'prefix': '+'
    };
const optionRed = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'RedText'],
    'prefix': '+'
    };
const optionGreen = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'GreenText'],
    'prefix': '+'
    };
const optionBlue = {
    'justification': 'L',
    'locales': 'en-US',
    'shortFormat': true,
    'cssClass':['BigNumber', 'BlueText'],
    'prefix': '+'
    };