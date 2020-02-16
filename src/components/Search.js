import React, { Component } from 'react'
/* global google */

export default class Search extends Component {
	state = {
		value: 'London',
		predictions: [{
			mainTxt: 'London',
			secondaryTxt: 'UK'
		}]
	}

	handleInputChange = (e) => {
		const { value } = e.target
		this.setState({ value: value })
		this.autocomplete(value)
	}

	handleInputSelect = (e) => {
		if (e.keyCode === 13) {
			this.props.search(this.state.predictions[0].mainTxt)
			this.setState({ value: this.state.predictions[0].mainTxt })
		}
	}

	autocomplete = (value) => {
		var service = new google.maps.places.AutocompleteService();

		var request = {
			input: value,
			types: ['(cities)']
		};

		service.getPlacePredictions(request, (predictions) => {
			this.setState({
				predictions: predictions.map(prediction => ({
					mainTxt: prediction.structured_formatting.main_text,
					secondaryTxt: prediction.structured_formatting.secondary_text
				}))
			})
		})
	};

	render() {
		//const {main_text, secondary_text} = this.state.predictions[0].structured_formatting

		return (
			<header>
				<h1 className="search-heading">Right now in</h1>
				<div className="search-input-container">
					<input className="autocomplete-input" type="text"
						value={this.state.predictions[0].mainTxt}
						style={{ width: `${this.state.predictions[0].mainTxt.length}ch` }}>
					</input>
					<input className="search-input" type="text" placeholder="Enter a place..." name="query"
						value={this.state.value}
						onChange={(e) => this.handleInputChange(e)}
						onKeyUp={(e) => this.handleInputSelect(e)}
						style={{ width: `${this.state.predictions[0].mainTxt.length}ch` }}>
					</input>
				</div>
				<span className="secondary-txt">{this.state.predictions[0].secondaryTxt}</span>
				<h1>, it's cloudy</h1>
			</header>
		)
	}
}