import React from 'react';
import './Page.css';
import Header from './Header';
import GlobalDash from './GlobalDash';

export default class Page extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <GlobalDash />
            </div>
        );
    }
}