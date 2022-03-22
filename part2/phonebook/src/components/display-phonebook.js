import Person from './person'
import Search from './search'

const Phonebook = ({ search, handleSearch, nameSearch}) => {
    return (
        <div>
            <h2>Contacts</h2>
            <Search search={search} handleSearch={handleSearch} />
            <ul>
                {nameSearch.map(person =>
                <Person key={person.id} person={person} />
                )}
            </ul>
        </div>
    )
}

export default Phonebook