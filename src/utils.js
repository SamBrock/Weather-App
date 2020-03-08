import moment from 'moment'

export function getForecast(arr) {
    const day1 = moment().format('YYYY-MM-DD');
    const day6 = moment().add(5, 'days').format('YYYY-MM-DD');

    let min, max, weatherDesc;
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
                weatherDesc: getDesc(data.weather.weatherDesc),
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
    if (input) {
        if (input['1h']) {
            return input['1h'];
        }
        if (input['3h']) {
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

export function getDesc(obj) {
    const id = obj.id;

    // Thundering
    if (id >= 200 && id <= 299) {
        if (id === 210 || id === 211 || id === 212 || id === 221) {
            return { id, main: obj.main, description: "thundering", icon: "11d" }
        }
        return { id, main: obj.main, description: "stormy", icon: "15d" }
    }

    // Drizzling
    if (id >= 300 && id <= 399) {
        return { id, main: obj.main, description: "drizzling", icon: "09d" }
    }

    // Raining
    if (id >= 500 && id <= 599) {
        if (id >= 502 && id <= 504) {
            return { id, main: obj.main, description: "heaviliy raining", icon: "12d" }
        }
        if (id === 511) {
            return { id, main: obj.main, description: "freezing rain", icon: "14d" }
        }
        return { id, main: obj.main, description: "raining", icon: "10d" }
    }

    // Snowing
    if (id >= 600 && id <= 699) {
        if (id === 602 || id === 622) {
            return { id, main: obj.main, description: "heaviliy snowing", icon: "14d" }
        }
        return { id, main: obj.main, description: "snowing", icon: "13d" }
    }

    // Atmosphere
    if (id >= 700 && id <= 799) {
        return { id, main: obj.main, description: "foggy", icon: "50d" }
    }

    // Clear
    if (id === 800) {
        return { id, main: obj.main, description: "clear", icon: "01d" }
    }

    // Clouds
    if (id >= 801 && id <= 899) {
        if (id === 801 || id === 802) {
            return { id, main: obj.main, description: "partly cloudy", icon: "02d" }
        }
        if (id === 803 || id === 804) {
            return { id, main: obj.main, description: "cloudy", icon: "02d" }
        }
    }
}
