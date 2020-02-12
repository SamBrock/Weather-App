import React from 'react'
import {getCelcius} from '../utils'

export default function Weather(props) {
    return (
        <div>
            Temperature: {getCelcius(props.weather.main.temp)}<br />
            {props.weather.weather[0].main}
        </div>
    )
}