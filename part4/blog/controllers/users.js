const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

usersRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid credentials'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })

})

module.exports = usersRouter