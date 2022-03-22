import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    const names = persons.map(person => person.name)

    console.log(names.includes(newName))

    if (names.includes(newName) === true) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input 
                  value={newName} 
                  onChange={handlePersonChange}
                />
        </div>
        <div>
          <button type='sumbit'>Add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
