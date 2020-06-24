import React from 'react'
import { getCelsius, getFahrenheit } from '../utils'
import Clouds from '../img/clouds.svg'
import Wind from '../img/wind.svg'
import Rain from '../img/water.svg'

import Lottie from 'react-lottie'

export default function Weather(props) {
	let convert;
	if (props.scale === 'c') {
		convert = getCelsius;
	} else if (props.scale === 'f') {
		convert = getFahrenheit;
	}
 
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: require(`../img/icons/${props.weather.weatherDesc.icon}.json`),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<React.Fragment>
			<div className="weather-icon">
				<Lottie options={defaultOptions}
					height={200}
					width={200}
				/>
			</div>
			<div className="weather-temperature">
				{convert(props.temps.temp)}
			</div>
			<div className="weather-details">
				<div className="weather-info">
					<div className="weather-info-icon clouds"><img src={Clouds} /></div><span>{props.weather.clouds.all}</span><span className="weather-info-unit">%</span>
				</div>
				<div className="weather-info">
					<div className="weather-info-icon wind"><img src={Wind} /></div><span>{props.weather.wind.speed}</span><span className="weather-info-unit">mph</span>
				</div>
				<div className="weather-info">
					<div className="weather-info-icon rain"><img src={Rain} /></div><span>{props.weather.rain}</span><span className="weather-info-unit">inches</span>
				</div>
			</div>
		</React.Fragment>
	)
}