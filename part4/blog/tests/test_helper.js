const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'The Lies of Sauron',
        author: 'Galadriel',
        url: 'www.HalbrandIsNotSauron.com',
        likes: 30
    },
    {
        title: 'Pharazon Sux',
        author: 'Isildur',
        url: 'www.numenorianthoughts.com',
        likes: 555
    }
]

async function blogsInDB() {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = { blogsInDB, initialBlogs }