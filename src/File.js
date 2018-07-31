const fs = require('fs')

class File
{
    save (path, content) {
        console.log('\x1b[33m%s\x1b[0m', "Saving file:", path)
        fs.writeFileSync(path, content)
    }

    index (directory) {
        return fs.readdirSync(directory)
    }

    read (path) {
        return fs.readFileSync(path, 'utf8')
    }

    prepareOutputDirectory (folder) {
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
    }

    watch (file, fn) {
        fs.watch(file, fn)
    }
}

module.exports = File
