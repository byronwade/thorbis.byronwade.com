module.exports = {
    name: "Example Blueprint",
    layouts: ["default", "blog"],
    components: ["header", "footer", "blogPost"],
    data: {
        posts: [
            {
                title: "My First Post",
                slug: "my-first-post",
                content: "This is the body of my first post."
            }
        ]
    }
};