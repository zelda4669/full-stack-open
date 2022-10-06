const blogsRouter = require('express') .Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
        res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0

    })

    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
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