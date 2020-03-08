import React from 'react'
import { getCelsius, getFahrenheit } from '../utils'

export default function Forecast(props) {
	let convert;
	if (props.scale === 'c') {
		convert = getCelsius;
	} else if (props.scale === 'f') {
		convert = getFahrenheit;
	}
	return (
		<div className="weather-forecast">
			{props.forecast.map(weather => {
				return (
					<div className="forecast-details">
						<img className="forecast-icon" src={require(`../img/icons/${weather.weatherDesc.icon}.png`)} alt={weather.weatherDesc.description}/>
						<div className="forecast-temp">{`${convert(weather.max)} / ${convert(weather.min)}`}</div>
						<div className="forecast-day">{weather.date}</div>
					</div>
				)
			})}
		</div>
	)
}
