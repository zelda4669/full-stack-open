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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,

}