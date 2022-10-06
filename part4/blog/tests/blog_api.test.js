const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs returned as JSON', async () => {
    const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(initialBlogs.length)
}, 10000)

test('add a new blog', async () => {
    const newBlog = {
        title: 'One Ring to Rule Them All',
        author: 'Definitely Not Sauron',
        url: 'www.mordor.com',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('One Ring to Rule Them All')
})

test('id is called id', async() => {
    const response = await api.get(`/api/blogs/`)
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})