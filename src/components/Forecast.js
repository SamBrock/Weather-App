import React from 'react'
import {getCelcius, getDayName, getTime} from '../utils'

export default function Forecast(props) {
    return (
        <div>
            <h3>Forecast</h3>
            <table>
            {props.forecast.map((day, index) => {
                return (
                    getTime(day.dt) === 12 &&
                    <tr key={index}>
                        <td>{getDayName(day.dt)}</td>
                        <td>{getTime(day.dt)}</td>
                    </tr>
                )
            })}
            </table>
        </div>
    )
}
