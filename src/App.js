import React, { Component } from 'react'

import { getRain, getForecast, getDesc } from './utils'

import './styles/main.scss'

import Search from './components/Search'
import Weather from './components/Weather'
import Forecast from './components/Forecast'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			isLoading: true,
			scale: 'c',
			city: 'London'
		}
	}

	search = (value) => {
		// Get current weather
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value ? value : this.state.city}&appid=8058e5ea0ca0660b69cb3670e99aac53`)
			.then(res => res.json())
			.then(data => {
				console.log(data.weather[0]);
				this.setState({
					weather: { weatherDesc: getDesc(data.weather[0]), clouds: data.clouds, wind: data.wind, visibility: data.visibility, rain: getRain(data.rain)},
					temps: { temp: data.main.temp, tempMin: data.main.temp_min, tempMax: data.main.temp_max },
					times: { timezone: data.timezone, sunrise: data.sys.sunrise, sunset: data.sys.sunset },
				})
			})

		// Get forecast	
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value ? value : this.state.city}&appid=8058e5ea0ca0660b69cb3670e99aac53`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					forecast: getForecast(data.list),
					isLoading: false
				})
			})
	}

	handleCityChange = city => {
		this.setState({
			city,
		}, this.search(city))

	}

	handleScaleChange = e => {
		const { value } = e.target
		this.setState({
			scale: value
		})
	}

	componentDidMount() {
		this.search();
	}

	render() {
		return (
			this.state.isLoading ?
				<div>Loading...</div> :
				<div className="container">
					<Search city={this.state.city} onInputSelect={this.handleCityChange} weatherDesc={this.state.weather.weatherDesc.description} />
					<Weather scale={this.state.scale} temps={this.state.temps} weather={this.state.weather} />
					<Forecast scale={this.state.scale} forecast={this.state.forecast} />

					<div className="set-scale-btns">
						<button className="set-scale-btn set-celsius" value="c" onClick={(e) => { this.handleScaleChange(e) }}>C</button>
						<span> | </span>
						<button className="set-scale-btn set-fahrenheit" value="f" onClick={(e) => { this.handleScaleChange(e) }}>F</button>
					</div>
				</div>
		)
	}
}