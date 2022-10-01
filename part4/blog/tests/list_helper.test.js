const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const blogs = [
        {
            _id: '5a445hjn',
            title: 'A Test Blog',
            author: 'Yo Mamma',
            url: 'www.google.com',
            likes: 5,
            _v: 0
        }
    ]

    const bigList = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
    ]

    test('only one blog in the list', () => {
        expect(listHelper.totalLikes(blogs)).toBe(5)
    })

    test('empty list returns zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('multiple list items', () => {
        expect(listHelper.totalLikes(bigList)).toBe(36)
    })

    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('favorite blog', () => {
    const blogs = [
        {
            _id: '5a445hjn',
            title: 'A Test Blog',
            author: 'Yo Mamma',
            url: 'www.google.com',
            likes: 5,
            _v: 0
        }
    ]

    const bigList = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
    ]

    test('empty list', () => {
        expect(listHelper.favoriteBlog([])).toEqual([])
    })

    test('single element', () => {
        let result = {
            title: 'A Test Blog',
            author: 'Yo Mamma',
            likes: 5,
        }
        expect(listHelper.favoriteBlog(blogs)).toEqual(result)
    })

    test('list of many', () => {
        let result =  {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
          }
          expect(listHelper.favoriteBlog(bigList)).toEqual(result)
    })
})

describe('prolific author', () => {
    const blogs = [
        {
            _id: '5a445hjn',
            title: 'A Test Blog',
            author: 'Yo Mamma',
            url: 'www.google.com',
            likes: 5,
            _v: 0
        }
    ]

    const bigList = [
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
    ]

    test('empty list', () => {
        expect(listHelper.mostBlogs([])).toEqual('no match')
    })

    test('a single blog', () => {
        let result = {
            author: 'Yo Mamma',
            blogs: 1
        }
        expect(listHelper.mostBlogs(blogs)).toEqual(result)
    })

    test('lots of blogs', () => {
        let result = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(listHelper.mostBlogs(bigList)).toEqual(result)
    })
})

describe('most liked', () => {
    const blogs = [
        {
            _id: '5a445hjn',
            title: 'A Test Blog',
            author: 'Yo Mamma',
            url: 'www.google.com',
            likes: 5,
            _v: 0
        }
    ]

    const bigList = [
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
    ]

    test('empty array', () => {
        expect(listHelper.mostLikes([])).toEqual('no match')
    })

    test('single item', () => {
        let result = {
            author: 'Yo Mamma',
            likes: 5
        }
        expect(listHelper.mostLikes(blogs)).toEqual(result)
    })

    test('lots of blogs', () => {
        let result = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(listHelper.mostLikes(bigList)).toEqual(result)
    })
})
