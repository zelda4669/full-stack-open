const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { all } = require('../app')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs returned as JSON', async () => {
    const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
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
    
    const allBlogs = await helper.blogsInDB()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = allBlogs.map(b => b.title)
    expect(titles).toContain('One Ring to Rule Them All')
})

test('id is called id', async() => {
    const response = await api.get(`/api/blogs/`)
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('likes default to zero', async() => {
    const newBlog = {
        title: 'One Ring to Rule Them All',
        author: 'Definitely Not Sauron',
        url: 'www.mordor.com'
    }

    await api.post('/api/blogs').send(newBlog)
    
    const allBlogs = await helper.blogsInDB()
    const addedBlog = allBlogs[allBlogs.length-1]

    expect(addedBlog.likes).toBe(0)
})

test('need title and url to create a blog', async() => {
    const newBlog = {
        author: 'There is no author, only Zuul'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const allBlogs = await helper.blogsInDB()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})