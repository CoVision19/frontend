import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Loader from 'react-loader-spinner'
import './Header.css';
import 'react-day-picker/lib/style.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { formatDate, parseDate } from 'react-day-picker/moment';
import logo from '../images/logo.png';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let before = new Date(today.getTime() - (24*60*60*1000) * 5);
        let yesterday = new Date(today.getTime() - (24*60*60*1000) * 1);

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.updateDate = this.props.updateDateCallback;
        this.state = {
          from: before,
          to: yesterday
        };
        this.updateDate(this.state.from, this.state.to);
    }

    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
          return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
          this.to.getDayPicker().showMonth(from);
        }
        this.updateDate(from, to);
      }

      refresh() {
          this.updateDate(this.state.from, this.state.to);
      }
    
      handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from }, this.refresh);
      }
    
      handleToChange(to) {
        this.setState({ to }, this.showFromMonth);
      }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className="Header">
                <span className="Header-left">
                    <img src={logo} alt="CoVision19 Logo" className="inner Header-image"/>
                    <div className="inner Header-title">CoVision19</div>
                </span>

                <div className="Header-middle">
                    <div className="InputFromTo">
                        {'From: '}
                        <DayPickerInput
                            value={from}
                            placeholder="From"
                            format="LL"
                            formatDate={formatDate}
                            parseDate={parseDate}
                            dayPickerProps={{
                                selectedDays: [from, { from, to }],
                                disabledDays: { after: to },
                                toMonth: to,
                                modifiers,
                                numberOfMonths: 2,
                                onDayClick: () => this.to.getInput().focus(),
                            }}
                            onDayChange={this.handleFromChange}
                        />&nbsp;&nbsp;&nbsp;
                        <span className="InputFromTo-to">
                        {' To: '}
                        <DayPickerInput
                            ref={el => (this.to = el)}
                            value={to}
                            placeholder="To"
                            format="LL"
                            formatDate={formatDate}
                            parseDate={parseDate}
                            dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: from },
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 2,
                            }}
                            onDayChange={this.handleToChange}
                        />
                        </span>
                        <Loader className="inner Header-loader" type="Oval" color="#FFFFFF" height={30} width={30} visible={this.props.LoaderVisible} />
                    </div>
                </div>

                <div className="Header-right">
                    <svg className="Header-icon" version="1.1" viewBox="0 0 384 384" onClick={() => {alert('Coming soon!'); }}>
                        <g>
                            <rect x="0" y="277.333" width="384" height="42.667"/>
                            <rect x="0" y="170.667" width="384" height="42.667"/>
                            <rect x="0" y="64" width="384" height="42.667"/>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}