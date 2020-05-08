import React from 'react';
import Select from 'react-select';
import moment from 'moment';
import './CountryDash.css';

import { sortDataByCountryUID, createOptions } from '../calculators/country';
import { isEmpty } from '../calculators/basics';
import MyLine from './line';
var randomColor = require('randomcolor');

export default class CountryDash extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedOption: null,
            countrySortedData: {}
        }
    }

    handleChange(selectedOption) {
        this.setState({
            selectedOption: selectedOption
        });
    }

    componentDidMount() {
        this.props.disableLoadingCallback();
    }

    makeArrayOf(dayList, keyWord) {
        let res = [];

        for (let key in dayList) {
            res.push(dayList[key][keyWord]);
        }
        return res;
    }

    createLinesData(options, countries, keyWord, colors) {
        let datasets = [];
        let days = [];
        if (options === null || options.length <= 0)
            return {};
        let iColors = 0;
        for (let key in countries[options[0].label].days)
            days.push(key);
        options.forEach(elem => {
            datasets.push({
                label: elem.label,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: colors[iColors],
                borderWidth: 2,
                data: this.makeArrayOf(countries[elem.label].days, keyWord)
            })
            iColors += 1;
        });
        for (let key in days) {
            days[key] = moment(new Date(days[key])).format('dddd, MMMM Do');
        }
        return {
            labels: days,
            datasets: datasets
        }
    }

    render() {
        let countrySortedData = sortDataByCountryUID(this.props.dataCache, this.props.countryCache)
        if (isEmpty(countrySortedData))
            return (<div></div>);

        let options = createOptions(countrySortedData);
        let colors = randomColor({
            count: (this.state.selectedOption ? this.state.selectedOption.length : 1),
            luminosity: 'bright',
            alpha: 1.0
         });
        let lines = this.createLinesData(this.state.selectedOption, countrySortedData, 'Infected', colors);
        let lines2 = this.createLinesData(this.state.selectedOption, countrySortedData, 'Active', colors);
        let lines3 = this.createLinesData(this.state.selectedOption, countrySortedData, 'Recovered', colors);
        let lines4 = this.createLinesData(this.state.selectedOption, countrySortedData, 'Deaths', colors);

        return (
            <div className="Country">
                <div className="Country-title">Country Comparator</div>
                <div className="Country-selector">
                    <Select className="Country-size" value={this.state.selectedOption} onChange={this.handleChange} options={options} isMulti={true} isSearchable={true} />
                </div>

                <div className="Country-row">
                    <div className="Subtitle">Infected People</div>
                    <MyLine data={lines} height={350}/>
                </div>
                <div className="Country-row">
                    <div className="Subtitle">Active People</div>
                    <MyLine data={lines2} height={350}/>
                </div>
                <div className="Country-row">
                    <div className="Subtitle">Recovered People</div>
                    <MyLine data={lines3} height={350}/>
                </div>
                <div className="Country-row">
                    <div className="Subtitle">Deaths</div>
                    <MyLine data={lines4} height={350}/>
                </div>
            </div>
        );
    }
}