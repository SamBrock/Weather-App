import React from 'react'
import { getCelsius, getFahrenheit } from '../utils'
import Sunny from '../img/sunny.svg'

export default function Weather(props) {
	let convert;
	if (props.scale === 'c') {
		convert = getCelsius;
	} else if (props.scale === 'f') {
		convert = getFahrenheit;
	}

	return (
		<React.Fragment>
			<div className="weather-icon">
				<img src={Sunny} height="160px" alt="Test"></img>
			</div>
			<div className="weather-temperature">
				{convert(props.temps.temp)}
			</div>
			<div className="weather-details">
				<span>clouds: {props.weather.clouds.all}</span><br />
				<span>wind speed: {props.weather.wind.speed}</span><br />
				<span>rain: {props.weather.rain}</span>
			</div>
		</React.Fragment>
	)
}