const StaticGenerator = require('../src/StaticGenerator')
const File = require('../src/File.js')

jest.mock('../src/File.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
        read() {
            return '@extends(master)'
        },

        index() {
            return ['a']
        },

        save () {
            return ''
        }
    }
  })
})


StaticGenerator.generate()
