const URLResolver = {
    /**
     * Resolves relative links, assuming that index.html is placed
     * in the root directory, and all other html-files in the
     * html-folder.
     */
    links (file, layout) {
        let links = matchAll(layout, 'link')

        links.forEach(link => {
            link = match(link, 'link')

            let regexp = new RegExp(`@link\\(${link}\\)`)
            if (file.split('.')[0] === 'index') {
                layout = layout.replace(regexp, link === 'index' ? 'index.html' : `html/${link}.html`)
                return
            }

            layout = layout.replace(regexp, link === 'index' ? '../index.html' : `${link}.html`)
        })

        return layout
    },

    /**
     * Resolves css links, assuming that index.html is placed
     * in the root directory, and all other html-files in the
     * html-folder.
     */
    css (file, layout) {
        let links = matchAll(layout, 'css')

        links.forEach(link => {
            link = match(link, 'css')
            let regexp = new RegExp(`@css\\(${link}\\)`)

            layout = layout.replace(regexp, file.split('.')[0] === 'index' ? `styles/${link}.css` : `../styles/${link}.css`)
        })

        return layout
    },

    /**
     * Resolves js-links, assuming that index.html is placed
     * in the root directory, and all other html-files in the
     * html-folder.
     */
    js (file, layout) {
        let links = matchAll(layout, 'js')

        links.forEach(link => {
            link = match(link, 'js')
            let regexp = new RegExp(`@js\\(${link}\\)`)

            layout = layout.replace(regexp, file.split('.')[0] === 'index' ? `js/${link}.js` : `../js/${link}.js`)
        })

        return layout
    }
}

function matchAll (layout, type) {
    let regExp = new RegExp(`@${type}\\((.*?)\\)`, 'g')
    return layout.match(regExp) || []
}

function match (layout, type) {
    let regExp = new RegExp(`@${type}\\((.*?)\\)`)
    return layout.match(regExp)[1]
}

module.exports = URLResolver

