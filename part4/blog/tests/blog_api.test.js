const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs returned as JSON', async () => {
    const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(0)
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})