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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,

}