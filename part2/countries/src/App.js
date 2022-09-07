import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Content from './components/content'
import Search from './components/search'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(
    () => {
      axios
        .get('https://restcountries.com/v3.1/all/')
        .then(response => {
          setCountries(response.data)
        })
    }, [])

  const handleSearch = (event) => {
    let e = event.target.value.toLowerCase()
    setSearch(e)
  }

  const countrySearch = countries.filter(country => country.name.common.toLowerCase().includes(search))

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Content countrySearch = {countrySearch} handleSearch={handleSearch} />
    </div>
  )
}

export default App