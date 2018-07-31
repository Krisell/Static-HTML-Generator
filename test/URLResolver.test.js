const URLResolver = require('../src/URLResolver')

test('Links are generated correctly', () => {
    let input = `<a href="@link(file)">File</a>`

    let indexOutput = `<a href="html/file.html">File</a>`
    let otherOutput = `<a href="file.html">File</a>`

    expect(URLResolver.links('index.html', input)).toBe(indexOutput)
    expect(URLResolver.links('adam.html', input)).toBe(otherOutput)
})

test('CSS URLs are generated correctly', () => {
    let input = `<link rel="stylesheet" href="@css(style)">`

    let indexOutput = `<link rel="stylesheet" href="styles/style.css">`
    let otherOutput = `<link rel="stylesheet" href="../styles/style.css">`

    expect(URLResolver.css('index.html', input)).toBe(indexOutput)
    expect(URLResolver.css('adam.html', input)).toBe(otherOutput)
})

test('JS URLs are generated correctly', () => {
    let input = `<script src="@js(script)"></script>`

    let indexOutput = `<script src="js/script.js"></script>`
    let otherOutput = `<script src="../js/script.js"></script>`

    expect(URLResolver.js('index.html', input)).toBe(indexOutput)
    expect(URLResolver.js('adam.html', input)).toBe(otherOutput)
})

test('JPG-image URLs are generated correctly', () => {
    let input = `<img src="@jpg(image)"></img>`

    let indexOutput = `<img src="images/image.jpg"></img>`
    let otherOutput = `<img src="../images/image.jpg"></img>`

    expect(URLResolver.jpg('index.html', input)).toBe(indexOutput)
    expect(URLResolver.jpg('adam.html', input)).toBe(otherOutput)
})

test('PNG-image URLs are generated correctly', () => {
    let input = `<img src="@png(image)"></img>`

    let indexOutput = `<img src="images/image.png"></img>`
    let otherOutput = `<img src="../images/image.png"></img>`

    expect(URLResolver.png('index.html', input)).toBe(indexOutput)
    expect(URLResolver.png('adam.html', input)).toBe(otherOutput)
})
