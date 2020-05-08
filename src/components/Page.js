import React from 'react';
import './Page.css';
import Header from './Header';
import GlobalDash from './GlobalDash';
import CountryDash from './CountryDash';

const API_URL = 'https://api.covision19.thedoux.fr';
//const API_URL = 'http://localhost:3000';

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
        this.changePage = this.changePage.bind(this);
        this.disableLoading = this.disableLoading.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            data: {},
            countries: [],
            from: undefined,
            to: undefined,
            showGlobal: true
        };
    }

    changePage() {
        this.setState({
            isLoading: true,
            showGlobal: !this.state.showGlobal
        });
    }

    disableLoading() {
        this.setState({
            isLoading: false
        });
    }

    // This function is sent to the "Header.js" component,
    // it is a callback responsible for changing the front according to the date
    updateDate(from, to) {
        this.setState({
            from: from,
            to: to,
            isLoading: true
        }, this.componentDidMount);
    }

    formatDateISOtoYMD(date) {
		var splitter = date.toISOString().split('T')[0].split('-');
		return splitter[0] + '-' + splitter[1] + '-' + splitter[2];
	}

    componentDidMount() {
        if (!this.state.from || !this.state.to)
            return;
        this.setState({ isLoading: true });
        fetch(API_URL + '/timeline/daterange/' + this.formatDateISOtoYMD(this.state.from) + '_' + this.formatDateISOtoYMD(this.state.to))
            .then(response => response.json())
            .then((data) => {
                this.setState({ data: data.data });
                fetch(API_URL + '/location')
                    .then(response => response.json())
                    .then((countries) => {
                        this.setState({
                            countries: countries.data,
                            isLoading: false
                        });
                        console.log('State: ');
                        console.log(this.state);
                    }).catch(err => {
                        this.setState({ isLoading: false });
                    });
            }).catch(err => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        if (this.state.showGlobal)
            var content = <GlobalDash dataCache={this.state.data} countryCache={this.state.countries} disableLoadingCallback={this.disableLoading}/>
        else
            var content = <CountryDash dataCache={this.state.data} countryCache={this.state.countries} disableLoadingCallback={this.disableLoading}/>

        return (
            <div>
                <Header updateDateCallback={ this.updateDate } changePageCallback={ this.changePage } LoaderVisible={ this.state.isLoading } />
                {content}
            </div>
        );
    }
}