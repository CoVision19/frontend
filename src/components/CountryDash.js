import React from 'react';
import Select from 'react-select';
import './CountryDash.css';

import { sortDataByCountryUID, createOptions } from '../calculators/country';
import { isEmpty } from '../calculators/basics';
import MyBar from './bar';
import MyPie from './pie';
import MyLine from './line';

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

    render() {
        let countrySortedData = sortDataByCountryUID(this.props.dataCache, this.props.countryCache)
        if (isEmpty(countrySortedData))
            return (<div></div>);

        let options = createOptions(countrySortedData);
        return (
            <div className="Country">
                <div className="Country-title">Country Comparator</div>
                <div className="Country-selector">
                    <Select className="Country-size" value={this.state.selectedOption} onChange={this.handleChange} options={options} isMulti={true} isSearchable={true} />
                </div>

                <p>{countrySortedData["France"].rates.ActiveRate}</p>
            </div>
        );
    }
}