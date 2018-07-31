const fs = require('fs')

class File
{
    save (path, content) {
        console.log("Saving file:", path)
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
}

module.exports = File
