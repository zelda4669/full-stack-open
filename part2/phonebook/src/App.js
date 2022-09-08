import { useState, useEffect } from 'react'

import Phonebook from './components/display-phonebook'
import Field from './components/form-field'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
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
      let person = persons.find(p => p.name === newName)
      if(person.number !== newNumber) {
        if(window.confirm(`${newName} is already in your phonebook. Update their phone number?`)) {
          const changedPerson = {...person, number: newNumber}
          phonebookService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p: returnedPerson))
            })
        }
      } else {
          window.alert(`${newName} is already added to phonebook`)
      }
    } else {
      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
     
    }
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === Number(id))
    if(window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .deleteEntry(id)
        .then(() => setPersons(persons.filter(p => p !== person)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (event) => {
    removePerson(event.target.value)
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
      <Phonebook search={search} handleSearch={handleSearch} nameSearch={nameSearch} handleDelete={handleDelete} />
    </div>
  )
}

export default App
