import { useState, useEffect } from 'react'
import axios from 'axios'

import Phonebook from './components/display-phonebook'
import Field from './components/form-field'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const names = persons.map(person => person.name)

    if (names.includes(newName) === true) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const nameSearch = persons.filter(person => person.name.toLowerCase().includes(search))

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <Field label='Name' value={newName} handler={handleNameChange} />
        <Field label='Number' value={newNumber} handler={handleNumberChange} />
        <div>
          <button type='sumbit'>Add</button>
        </div>
      </form>
      <Phonebook search={search} handleSearch={handleSearch} nameSearch={nameSearch} />
    </div>
  )
}

export default App
