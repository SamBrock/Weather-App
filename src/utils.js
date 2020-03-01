import moment from 'moment'

export function getForecast(arr) {
    const day1 = moment().format('YYYY-MM-DD');
    const day6 = moment().add(5, 'days').format('YYYY-MM-DD');

    let min, max;
    let date = false;

    return arr
        .map(data => {
            return ({
                date: moment(data.dt * 1000).format('YYYY-MM-DD'),
                weather: { weatherDesc: data.weather[0] },
                temp: data.main.temp
            })
        })
        .filter(data => {
            if (data.date !== day1 && data.date !== day6) {
                return data;
            }
        })
        .map(data => {
            if (date === data.date) {
                if (data.temp > max) {
                    max = data.temp
                }
                if (data.temp < min) {
                    min = data.temp
                }
            } else {
                min = data.temp;
                max = data.temp;
                date = data.date;
            }

            return ({
                date: moment(data.date).format('ddd'),
                min,
                max
            })
        })
        .reverse()
        .filter((elem, index, self) => self.findIndex((t) => { return (t.date === elem.date) }) === index)
        .reverse()
}

export function getRain(input) {
    console.log(input);
    if(input){
        if(input['1h']){
            return input['1h'];
        }
        if(input['3h']){
            return input['3h'];
        }
    } else {
        return '0';
    }
}

export function getCelsius(input) {
    return Math.round(input - 273.15);
}

export function getFahrenheit(input) {
    return Math.round((input * (9 / 5)) - 459.67);
}
