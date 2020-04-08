import React from 'react';
import './Page.css';
import Header from './Header';
import Body from './Body';

export default class Page extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Body />
            </div>
        );
    }
}