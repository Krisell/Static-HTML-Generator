/**
 * Martin Krisell 2018
 *
 * Simple program to generate static html-pages from a
 * shared master file, in order t avoid syncronization problems
 * in situations where server-side rendering it not possible.
 */
const fs = require('fs')

getAllPages().forEach(file => {
    let page = getPageContent(file)
    let layout = fetchLayout(page)

    /**
     * The filename is used to set the active class for one meny-item.
     * Add the class active:name to enable this, where name corresponds
     * with the filename.
     */
    layout = setActivePage(file, layout)

    // Find all yields, and read corresonding sections from pages
    let sections = layout.match(/@yield\((.*)\)/g)
        .map(section => section.match(/@yield\((.*)\)/)[1])

     // For each yield, find the page content and insert it
    sections.forEach(section => {
        let regExp = new RegExp(`@section\\(${section}\\)([\\s\\S]+?)@endsection`)
        layout = layout.replace(`@yield(${section})`, page.match(regExp)[1].trim())
    })

    layout = resolveLinks(file, layout)
    layout = resolveCss(file, layout)
    layout = resolveJs(file, layout)

    saveFile(file, layout)
})

function setActivePage (file, layout) {
    let regexp = new RegExp(`active:${file.split('.')[0]}`, 'g')
    return layout
        .replace(regexp, 'active')
        .replace(/active:[a-zA-Z]+/g, '')
}

/**
 * One and only one layout may be used. If @extends is missing, an
 * error is thrown
 */
function fetchLayout (page) {
    let layout = page.match(/@extends\((.*)\)/)

    if (!layout) {
        throw new Error("Page must extend layout file.")
    }

    return fs.readFileSync(`./layouts/${layout[1]}.html`, 'utf8')
}

/**
 * Read the page-file from the pages-folder.
 */
function getPageContent (file) {
    return fs.readFileSync(`./pages/${file}`, 'utf8')
}

/**
 * Returns an array with all files in the pages-folder.
 */
function getAllPages () {
    return fs.readdirSync('./pages')
}

/**
 * Saves the resulting page html-file.
 * index.html is saved to the root dir and the other html-files
 * are saved to the html-directory (according to the problem description).
 */
function saveFile (file, layout) {
    let path = (file === 'index.html') ? '.' : 'html'
    fs.writeFileSync(`${path}/${file}`, layout)
}

/**
 * Resolves relative links, assuming that index.html is placed
 * in the root directory, and all other html-files in the
 * html-folder.
 */
function resolveLinks (file, layout) {
    let links = layout.match(/@link\((.*?)\)/g)

    links.forEach(link => {
        link = link.match(/@link\((.*?)\)/)[1]
        let regexp = new RegExp(`@link\\(${link}\\)`)

        if (file.split('.')[0] === 'index') {
            layout = layout.replace(regexp, link === 'index' ? 'index.html' : `html/${link}.html`)
            return
        }

        layout = layout.replace(regexp, link === 'index' ? '../index.html' : `${link}.html`)
    })

    return layout
}

/**
 * Resolves css links, assuming that index.html is placed
 * in the root directory, and all other html-files in the
 * html-folder.
 */
function resolveCss (file, layout) {
    let links = layout.match(/@css\((.*?)\)/g)

    links.forEach(link => {
        link = link.match(/@css\((.*?)\)/)[1]
        let regexp = new RegExp(`@css\\(${link}\\)`)

        layout = layout.replace(regexp, file.split('.')[0] === 'index' ? `styles/${link}.css` : `../styles/${link}.css`)
    })

    return layout
}

/**
 * Resolves js-links, assuming that index.html is placed
 * in the root directory, and all other html-files in the
 * html-folder.
 */
function resolveJs (file, layout) {
    let links = layout.match(/@js\((.*?)\)/g)

    links.forEach(link => {
        link = link.match(/@js\((.*?)\)/)[1]
        let regexp = new RegExp(`@js\\(${link}\\)`)

        layout = layout.replace(regexp, file.split('.')[0] === 'index' ? `js/${link}.js` : `../js/${link}.js`)
    })

    return layout
}
