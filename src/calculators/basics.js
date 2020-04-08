export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function arrayAverage(arr) {
    let sum = 0;
    arr.forEach(elem => {
        sum += elem;
    });
    return Math.round(sum / arr.length);
}

export function sumDay(day) {
    var recov = 0;
    var deaths = 0;
    var confirmed = 0;

    day.forEach(elem => {
        confirmed += parseInt(elem.Confirmed);
        deaths += parseInt(elem.Deaths);
        recov += parseInt(elem.Recovered);
    });
    return {TotalDeaths: deaths, TotalConfirmed: confirmed, TotalRecovered: recov};
}