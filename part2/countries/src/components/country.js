import React from 'react'

const Country = ({ country, handleSearch }) => {
    return( 
    <div>
        <li><button onClick={handleSearch} value={country.name.common}>{country.name.common}</button></li>
    </div>
    )
}

export default Country