import {isEmpty, arrayAverage} from './basics';

function getCountryNameByUID(countryUID, countryList) {
    for (let country in countryList) {
        if (countryList[country].UID === countryUID)
            return countryList[country];
    }
    return null;
}

function calculateRatesPerCountry(days) {
    let previousDayData = [0, 0, 0];
    let firstRound = true;
    let recovRates = [];
    let deathsRates = [];
    let activeRates = [];

    for (let daysIndex in days) {
        if (firstRound) {
            firstRound = !firstRound;
            previousDayData[0] = days[daysIndex].Active;
            previousDayData[1] = days[daysIndex].Recovered;
            previousDayData[2] = days[daysIndex].Deaths;
        } else {
            activeRates.push(Math.abs(days[daysIndex].Active - previousDayData[0]));
            recovRates.push(Math.abs(days[daysIndex].Recovered - previousDayData[1]));
            deathsRates.push(Math.abs(days[daysIndex].Deaths - previousDayData[2]));
            previousDayData[0] = days[daysIndex].Active;
            previousDayData[1] = days[daysIndex].Recovered;
            previousDayData[2] = days[daysIndex].Deaths;  
        }
    }
    return {
        DeathsRate: arrayAverage(deathsRates),
        RecoveredRate: arrayAverage(recovRates),
        ActiveRate: arrayAverage(activeRates),
    }
}

export function sortDataByCountryUID(data, countriesData) {
    let res = {};

    if (isEmpty(data) || isEmpty(countriesData))
        return res;
    for (let dayIndex in data) {
        for (let countryIndex in data[dayIndex]) {
            let countryName = getCountryNameByUID(data[dayIndex][countryIndex].UID, countriesData);
            if (countryName === null)
                continue;
            countryName = countryName.Country_Region;

            if (!(countryName in res)) {
                res[countryName] = { days: {}, rates: {} }
                res[countryName].days[dayIndex] = {
                    Active: parseInt(data[dayIndex][countryIndex].Active),
                    Infected: parseInt(data[dayIndex][countryIndex].Confirmed),
                    Deaths: parseInt(data[dayIndex][countryIndex].Deaths),
                    Recovered: parseInt(data[dayIndex][countryIndex].Recovered)
                }
            }
            else {
                res[countryName].days[dayIndex] = {
                    Active: parseInt(data[dayIndex][countryIndex].Active) + (dayIndex in res[countryName].days ? res[countryName].days[dayIndex].Active : 0),
                    Infected: parseInt(data[dayIndex][countryIndex].Confirmed) + (dayIndex in res[countryName].days ? res[countryName].days[dayIndex].Infected : 0),
                    Deaths: parseInt(data[dayIndex][countryIndex].Deaths) + (dayIndex in res[countryName].days ? res[countryName].days[dayIndex].Deaths : 0),
                    Recovered: parseInt(data[dayIndex][countryIndex].Recovered) + (dayIndex in res[countryName].days ? res[countryName].days[dayIndex].Recovered : 0)
                }
            }
        }
    }
    for (let key in res) {
        res[key].rates = calculateRatesPerCountry(res[key].days);
    }
    return res;
}

export function createOptions(countryData) {
    let res = [];

    if (isEmpty(countryData))
        return res;
    for (let key in countryData)
        res.push({ value: key, label: key});
    return res;
}