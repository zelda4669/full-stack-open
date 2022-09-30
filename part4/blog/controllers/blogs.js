const blogsRouter = require('express') .Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(err => next(err))
})

module.exports = blogsRouter