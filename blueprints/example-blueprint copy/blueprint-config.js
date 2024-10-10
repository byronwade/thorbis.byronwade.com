const { data } = require("autoprefixer");

module.exports = {
    name: "Example Blueprint",
    layouts: ["default", "blog"],
    components: ["header", "footer", "blogPost"],
    data: "data.json"
};