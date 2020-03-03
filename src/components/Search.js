import React, { Component } from 'react'
import AutosizeInput from 'react-input-autosize'

/* global google */

export default class Search extends Component {
	state = {
		userInput: this.props.city,
		predictions: [{
			mainTxt: 'London',
			secondaryTxt: 'UK'
		}]
	}

	handleInputChange = (e) => {
		const { value } = e.target
		this.setState({ userInput: value })
		this.autocomplete(value)
	}

	handleInputSelect = (e) => {
		if (e.keyCode === 13) {
			this.props.onInputSelect(this.state.predictions[0].mainTxt)
			this.setState({
				userInput: this.state.predictions[0].mainTxt
			})
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

	// Old search version
	render() {
		return (
			<header>
				<h1 className="search-heading">Right now in</h1>
				<div className="search-input-container">
					<AutosizeInput
						name="autocomplete-input"
						className="autocomplete-input"
						style={{ color: '#999999' }}
						value={this.state.predictions[0].mainTxt}
					/>
					<AutosizeInput
						name="search-input"
						className="search-input"
						value={this.state.userInput}
						onChange={(e) => this.handleInputChange(e)}
						onKeyUp={(e) => this.handleInputSelect(e)}
					/>
				</div>
				<span className="secondary-txt">{this.state.predictions[0].secondaryTxt}</span>
				<h1>, {this.props.weatherDesc}</h1>
			</header>
		)
	}
}