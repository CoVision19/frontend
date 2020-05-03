import React from 'react';
import './Page.css';
import Header from './Header';
import GlobalDash from './GlobalDash';

const API_URL = 'https://api.covision19.thedoux.fr';

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            data: {},
            countries: [],
            from: undefined,
            to: undefined
        };
    }

    // This function is sent to the "Header.js" component,
    // it is a callback responsible for changing the front according to the date
    updateDate(from, to) {
        this.setState({
            from: from,
            to: to
        }, this.componentDidMount)
    }

    formatDateISOtoYMD(date) {
		var splitter = date.toISOString().split('T')[0].split('-');
		return splitter[0] + '-' + splitter[1] + '-' + splitter[2];
	}

    componentDidMount() {
        if (!this.state.from || !this.state.to)
            return;
        // TODO Manage error
        fetch(API_URL + '/timeline/daterange/' + this.formatDateISOtoYMD(this.state.from) + '_' + this.formatDateISOtoYMD(this.state.to))
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
                <Header updateDateCallback={ this.updateDate } />
                <GlobalDash dataCache={this.state.data} countryCache={this.state.countries}/>
            </div>
        );
    }
}