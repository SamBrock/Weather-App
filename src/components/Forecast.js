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
					<div className="weather-forecast-day">
						<img />
						<span>{`${convert(weather.max)} / ${convert(weather.min)}`}</span>
						<span>{weather.date}</span>
					</div>
				)
			})}
		</div>
	)
}
