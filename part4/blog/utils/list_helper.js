function dummy(blogs) {
    return 1
}

function totalLikes(blogs) {
    const likes = []
    blogs.forEach(b => {
        likes.push(b.likes)
    });
    return likes.reduce((p, c) => p + c, 0)
}

module.exports = {
    dummy,
    totalLikes,
}