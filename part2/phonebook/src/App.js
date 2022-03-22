import { useState } from 'react'
import Phonebook from './components/display-phonebook'
import Field from './components/form-field'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
