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


    // <link rel="stylesheet" href="@css(style)">
    // <script src="@js(index)"></script>
