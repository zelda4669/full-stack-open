const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne({username})

    if(existingUser) {
        return res.status(400).json({ error: "That username is already taken!"})
    }

    if(username.length < 3) {
        return res.status(400).json({ error: 'Username is too short!' })
    }

    if(password.length < 3) {
        return res.status(400).json({ error: 'Password is too short!'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter