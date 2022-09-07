import React from 'react'
import Country from './country'
import CountryData from './country-data'


const Content = ({ countrySearch, handleSearch }) => {
    if (countrySearch.length > 10) {
        return (
            <div>
                <p>Too many matches!</p>
            </div>
        )
    } else if (countrySearch.length === 1) {
        return (
            <div>
                <CountryData country={countrySearch} />
            </div>
        )
    } else {
        return (
           <div>
                <ul>
                    {countrySearch.map(
                    (country, index) =>
                    <Country key={index} country={country} handleSearch={handleSearch} />
                    )}
                </ul>
            </div> 
        )
    }
}

export default Content