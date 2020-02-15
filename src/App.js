import React, { Component } from 'react'
import './App.css'

import Search from './components/Search'
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

	search = (value) => {
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value === undefined ? 'London' : value}&appid=8058e5ea0ca0660b69cb3670e99aac53`)
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				this.setState({
					city: data.city,
					weather: data.list,
					isLoading: false
				})
			})
	}

	componentDidMount() {
		this.search();
	}

	render() {
		return (
			this.state.isLoading ?
				<div>Loading...</div> :
				<div>
					<Search search={this.search} />
					<City city={this.state.city} />
					<Weather weather={this.state.weather[0]} />
					<Forecast forecast={this.state.weather} />
				</div>
		)
	}
}