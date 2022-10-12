const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('user tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('Charizard', 10)
        const user = new User({ username: 'Ash', name: 'Pikachu', passwordHash})

        await user.save()
    })

    test('user creation successful', async () => {
        const initialUsers = await helper.usersInDB()

        const newUser = {
            username: 'Team Rocket',
            name: 'Meowth',
            password: 'BlastOff'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const endUsers = await helper.usersInDB()
        expect(endUsers).toHaveLength(initialUsers.length + 1)

        const usernames = endUsers.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})