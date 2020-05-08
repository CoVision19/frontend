import React from 'react';
import './CountryDash.css';

import { sortDataByCountryUID } from '../calculators/country';
import { isEmpty } from '../calculators/basics';
import MyBar from './bar';
import MyPie from './pie';
import MyLine from './line';

export default class CountryDash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countrySortedData: null
        }
    }

    componentDidMount() {
        this.props.disableLoadingCallback();
    }

    render() {
        let countrySortedData = sortDataByCountryUID(this.props.dataCache, this.props.countryCache)

        return (
            <div className="Country">
                <div className="Country-title">Country Comparator</div>
                <div>incoming</div>
                <p>{countrySortedData["France"].rates.ActiveRate}</p>
            </div>
        );
    }
}