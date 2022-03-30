const CountryData = ({ country }) => {
    return (
        <div>
            <h1>{country[0]['name']['common']}</h1>
            <p>Capital: {country[0]['capital'][0]}
            <br></br>Area: {country[0]['area']}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country[0]['languages']).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country[0]['flags']['png']} width='200' height='200' />
        </div>
    )
}

export default CountryData