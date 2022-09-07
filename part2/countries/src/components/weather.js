import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState('')

    const weatherKey = process.env.REACT_APP_WEATHER_SECRET

    useEffect(
        () => {
          axios
            .get(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}&aqi=no`)
            .then(response => {
              setWeather(response.data)
            })
        }, [])

    if(weather === '') {
        return <p>Weather is loading...</p>
    } else {
        return( 
            <div>
                <p>It is currently {weather['current']['temp_f']}°F and {weather['current']['condition']['text']}</p>
                <img src={weather['current']['condition']['icon']} alt={`The weather is ${weather['current']['condition']['text']}.`} />
            </div>
        )
    }

}

export default Weather