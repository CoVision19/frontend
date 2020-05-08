import React from 'react';
import './CountryDash.css';

import MyBar from './bar';
import MyPie from './pie';
import MyLine from './line';

export default class CountryDash extends React.Component {

    render() {
        return (
            <div className="Country">
                <div className="Country-title">Country Comparator</div>
                <div>incoming</div>
            </div>
        );
    }
}