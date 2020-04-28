import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.state = {
          from: undefined,
          to: undefined
        };
    }

    showFromMonth() {
        const { from, to } = this.state;
        if (!from) {
          return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
          this.to.getDayPicker().showMonth(from);
        }
      }
    
      handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.setState({ from });
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
                        />
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