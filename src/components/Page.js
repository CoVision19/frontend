import React from 'react';
import './Page.css';
import Header from './Header';
import GlobalDash from './GlobalDash';

const API_URL = 'http://localhost:3000'

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            countries: []
        };
    }

    componentDidMount() {
        // TODO Manage error
        fetch(API_URL + '/timeline/daterange/2020-04-01_2020-04-09')
            .then(response => response.json())
            .then((data) => {
                this.setState({ data: data.data });
                fetch(API_URL + '/location')
                    .then(response => response.json())
                    .then((countries) => {
                        this.setState({ countries: countries.data });
                        console.log('State: ');
                        console.log(this.state);
                    });
            });
    }

    render() {
        return (
            <div>
                <Header />
                <GlobalDash dataCache={this.state.data} countryCache={this.state.countries}/>
            </div>
        );
    }
}