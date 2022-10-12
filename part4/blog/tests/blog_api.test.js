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

describe('the big picture works as expected', () => {
    test('blogs returned as JSON', async () => {
        const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 20000)

    test('id is called id', async() => {
        const response = await api.get(`/api/blogs/`)
        const blog = response.body[0]

        expect(blog.id).toBeDefined()
    })
})

describe('saving new blogs', () => {
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

    test('likes default to zero', async() => {
        const newBlog = {
            title: 'One Ring to Rule Them All',
            author: 'Definitely Not Sauron',
            url: 'www.mordor.com'
        }

       const addedBlog = await api.post('/api/blogs').send(newBlog)
        
        const allBlogs = await helper.blogsInDB()
        console.log(addedBlog.body)
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
})

describe('editing the database', () => {
    test('blogs delete as expected', async() => {
        const blogsAtStart = await helper.blogsInDB()
        const toDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${toDelete.id}`).expect(204)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(toDelete.title)
    })

    test('add likes', async() => {
        const allBlogs = await helper.blogsInDB()
        const toEdit = allBlogs[0]
        const newLikes = { likes: 1000 }

        await api.put(`/api/blogs/${toEdit.id}`).send(newLikes).expect(200)

        const editedBlogs = await helper.blogsInDB()
        const wasEdited = editedBlogs.filter(b => b.id === toEdit.id)[0]

        expect(wasEdited.likes).toBe(1000)

    })
})







afterAll(() => {
    mongoose.connection.close()
})



