import React, { Component } from 'react';
import './App.css';
import City from './components/City'
import Weather from './components/Weather'
import Forecast from './components/Forecast'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			isLoading: true,
			city: {},
			weather: {}
		}
	}

	componentDidMount() {
		fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=8058e5ea0ca0660b69cb3670e99aac53')
			.then(res => res.json())
			.then(data => {
				this.setState({
					city: data.city,
					weather: data.list,
					isLoading: false
				})
			})
	}

	render() {
		return (
			this.state.isLoading ?
				<div>Loading...</div> :
				<div>
					<City city={this.state.city} />
					<Weather weather={this.state.weather[0]} />
					<Forecast forecast={this.state.weather} />
				</div>
		)
	}
}