const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'The Lies of Sauron',
        url: 'www.HalbrandIsNotSauron.com',
        likes: 30
    },
    {
        title: 'Pharazon Sux',
        url: 'www.numenorianthoughts.com',
        likes: 555
    }
]

async function blogsInDB() {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

async function usersInDB() {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { 
    blogsInDB, 
    initialBlogs,
    usersInDB 
}