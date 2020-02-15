import React, { Component } from 'react'
/* global google */

export default class Search extends Component {
	state = {
		value: '',
		predictions: {}
	}

	handleInputChange = (e) => {
		const { value } = e.target
		this.setState({ value: value })
		this.autocomplete(value)
	}

	handleInputSelect = (e) => {
		if (e.keyCode === 13) {
			this.props.search(this.state.predictions[0].description)
			this.setState({ value: this.state.predictions[0].description })
		}
	}

	autocomplete = (value) => {
		var service = new google.maps.places.AutocompleteService();

		var request = {
			input: value,
			types: ['(cities)']
		};

		service.getPlacePredictions(request, (predictions) => {
			this.setState({ predictions: predictions })
		})
	};

	render() {
		return (
			<React.Fragment>
				<div className="search-div">
					<input type="text" id="background-input" value={this.state.predictions.length > 0 ? this.state.predictions[0].description : ''}></input>
					<input id="search" value={this.state.value} type="text" placeholder="Enter a place..." name="query" onChange={(e) => this.handleInputChange(e)} onKeyUp={(e) => this.handleInputSelect(e)}></input>
				</div>
			</React.Fragment>
		)
	}
}