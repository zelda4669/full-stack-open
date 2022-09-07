import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

function getAll() {
    let request = axios.get(baseUrl)
    return request.then(response => response.data)
}

function create(newObject) {
    let request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

function update(id, newObject) {
    let request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }