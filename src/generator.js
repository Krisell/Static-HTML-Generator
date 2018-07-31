require('./StaticGenerator').generate({
    watch: process.argv[2] === '--watch'
})
