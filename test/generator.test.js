

// function mockFileOperations (mockDetails) {
//     const mockDefaultOperations = {
//         read () {
//             return '@extends(master)'
//         },

//         index () {
//             console.log("Index moxk")
//             return ['a', 'b']
//         },

//         save () {

//         }
//     }

//     const File = require('../src/File.js')

//     jest.mock('../src/File.js')
//     File.mockClear()

//     File.mockImplementation(() => {
//         return {
//             ...mockDefaultOperations,
//             ...mockDetails
//         }
//     })
// }

// test('@extends is needed', () => {
//     mockFileOperations({
//         read () {
//             return ''
//         }
//     })

//     const StaticGenerator = require('../src/StaticGenerator')

//     expect(() => {
//         StaticGenerator.generate()
//     }).toThrow()
// })

test.skip('No files run', () => {
    // mockFileOperations()
    // const StaticGenerator = require('../src/StaticGenerator')
    // // expect(() => {
    //     StaticGenerator.generate()
    // // }).toThrow()
})

