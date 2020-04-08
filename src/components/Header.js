import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <span className="Header-left">
                    <img src={logo} alt="CoVision19 Logo" className="inner Header-image"/>
                    <div className="inner Header-title">CoVision19</div>
                    <div className="inner Header-subtitle">- USEFUL STATISTICS</div>
                </span>

                <div className="Header-middle">
                    {/* https://react-day-picker.js.org/examples/input-from-to */}
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