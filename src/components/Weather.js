import React from 'react'
import { getCelcius } from '../utils'
import Sunny from '../img/sunny.svg'

export default function Weather(props) {
	return (
		<React.Fragment>
			<div className="weather-icon">
				<img src={Sunny} height="160px"></img>
			</div>
			<div className="weather-temperature">
				{getCelcius(props.weather.main.temp)}
			</div>
			<div className="weather-details">

			</div>
		</React.Fragment>
	)
}