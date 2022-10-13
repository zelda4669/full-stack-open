const blogsRouter = require('express') .Router()

const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if(!decodedToken.id) {
        return res.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes || 0,
        user: user
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    const token = jwt.verify(req,token, process.env.SECRET)
    const id = req.params.id
    const blog = await Blog.findById(id)
    
    if(token.id !== blog.user) {
        return res.status(401).json({ error: "you don't have permission to delete this entry" })
    }


    await Blog.findByIdAndRemove(id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const likes = Number(req.body.likes)

    const toUpdate = await Blog.findById(req.params.id)
    toUpdate.likes = likes

    const updatedBlog = await toUpdate.save()

    res.json(updatedBlog)
})

module.exports = blogsRouter