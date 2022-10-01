const _ = require('lodash')

function dummy(blogs) {
    return 1
}

function totalLikes(blogs) {
    const likes = []
    blogs.forEach(b => {
        likes.push(b.likes)
    })
    return likes.reduce((p, c) => p + c, 0)
}

function favoriteBlog(blogs) {
    if(blogs.length === 0) {
        return []
    } else {
        const likes = []
        blogs.forEach(b => {
            likes.push(b.likes)
        })
        let mostLikes = Math.max(...likes)
        let bestBlog = blogs.filter(blog => blog.likes === mostLikes)

        return {
            title: bestBlog[0].title,
           author: bestBlog[0].author,
           likes: bestBlog[0].likes
       }
    }
   
}

function mostBlogs(blogs) {
    if(blogs.length === 0) {
        return 'no match'
    } else {
        let nums = _(blogs).countBy('author').toPairs().sortBy(1).reverse().head()
        return {
            author: nums[0],
            blogs: nums[1]
        }
    }
}

function mostLikes(blogs) {
    if(blogs.length === 0) {
        return 'no match'
    } else {
        let nums = _(blogs).countBy('author').toPairs().value()
        let authors = nums.map(author => author[0])
        let likes = []
        authors.forEach(author => {
            let filteredBlogs = blogs.filter(blog => blog.author === author)
            let numLikes = []
            filteredBlogs.forEach(blog => {
                numLikes.push(blog.likes)
            })
            let sumLikes = numLikes.reduce((p, c) => p + c)
            likes.push({author: author, likes: sumLikes})
        })
        return _(likes).sortBy('likes').reverse().head()
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,

}