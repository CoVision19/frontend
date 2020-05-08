import {isEmpty, sumDay} from './basics';
import moment from 'moment';

export function calculateTotalValue(data) {
    let lastDay = null;

    if (isEmpty(data))
        return {TotalDeaths: 0, TotalConfirmed: 0, TotalRecovered: 0};
    for (var key in data) {
        if (data[key] === null)
            continue;
        lastDay = key;
    }
    return sumDay(data[lastDay]);
}

export function calculateTotalForEachDay(data) {
    let res = {
        days: [],
        Recovered: [],
        Deaths: [],
        Infected: [],
        Active: []
    }
    if (isEmpty(data))
        return res;
    for (let key in data) {
        if (data[key] === null)
            continue;
        let tmp = sumDay(data[key]);

        res.days.push(key);
        res.Infected.push(tmp.TotalConfirmed);
        res.Active.push(tmp.TotalConfirmed - tmp.TotalDeaths - tmp.TotalDeaths);
        res.Deaths.push(tmp.TotalDeaths);
        res.Recovered.push(tmp.TotalRecovered);
    }
    for (let key in res.days) {
        res.days[key] = moment(new Date(res.days[key])).format('dddd, MMMM Do');
    }
    return res;
}

function findCountry(countryUID, countryList) {
    for (let country in countryList) {
        if (countryList[country].UID === countryUID)
            return countryList[country];
    }
    return null;
}

function sortCountriesByInfected(a, b) {
    if (a.Infected > b.Infected)
        return -1;
    else if (a.Infected === b.Infected)
        return 0;
    return 1;
}

export function calculateTotalForTop5(data, countryList) {
    let res = {
        countries: [],
        Recovered: [],
        Deaths: [],
        Infected: [],
        Active: []
    }
    let lastDay = null;
    let allCountries = [];

    if (isEmpty(data) || isEmpty(countryList))
        return res;
    for (let key in data) {
        if (data[key] === null)
            continue;
        lastDay = key;
    }
    data[lastDay].forEach(elem => {
        let countryName = findCountry(elem.UID, countryList);
        if(countryName === null)
            return;
        countryName = countryName.Country_Region;

        let index = allCountries.findIndex(elem => { return elem.Country === countryName; })
        if (index === -1)
            allCountries.push({
                Recovered: parseInt(elem.Recovered),
                Deaths: parseInt(elem.Deaths),
                Infected: parseInt(elem.Confirmed),
                Active: parseInt(elem.Active),
                Country: countryName
            });
        else
            allCountries[index] = {
                Recovered: parseInt(elem.Recovered) + allCountries[index].Recovered,
                Deaths: parseInt(elem.Deaths) + allCountries[index].Deaths,
                Infected: parseInt(elem.Confirmed) + allCountries[index].Infected,
                Active: parseInt(elem.Active) + allCountries[index].Active,
                Country: countryName
            }
    });
    let tmp = allCountries.sort(sortCountriesByInfected).slice(0,5);
    tmp.forEach(elem => {
        res.countries.push(elem.Country);
        res.Active.push(elem.Active);
        res.Deaths.push(elem.Deaths);
        res.Infected.push(elem.Infected);
        res.Recovered.push(elem.Recovered);
    });
    return res;
}