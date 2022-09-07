import React from 'react'
import Weather from './weather'

const CountryData = ({ country }) => {
    let capital = country[0]['capital'][0]

    return (
        <div>
            <h1>{country[0]['name']['common']}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {country[0]['area']}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country[0]['languages']).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country[0]['flags']['png']} alt={`The flag of ${country[0]['name']['common']}.`} />
            <h2>The Weather in {capital} is:</h2>
            <Weather city={capital} />
        </div>
    )
}

export default CountryData