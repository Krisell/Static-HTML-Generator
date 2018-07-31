const URLResolver = {
    /**
     * Resolves relative links, assuming that index.html is placed
     * in the root directory, and all other html-files in the
     * html-folder.
     */
    resolvers: ['links', 'css', 'js', 'jpg', 'png'],

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
        return URLResolver.baseResolver(file, layout, {
            type: 'css',
            directory: 'styles',
        })
    },

    /**
     * Resolves js-links, assuming that index.html is placed
     * in the root directory, and all other html-files in the
     * html-folder.
     */
    js (file, layout) {
        return URLResolver.baseResolver(file, layout, {
            type: 'js',
            directory: 'js',
        })
    },

    /*Assuming all images is stored in the 'images'-directory specified in the first assignment.*/
    jpg (file, layout) {
        return URLResolver.baseResolver(file, layout, {
            type: 'jpg',
            directory: 'images',
        })
    },

    png (file, layout) {
        return URLResolver.baseResolver(file, layout, {
            type: 'png',
            directory: 'images',
        })
    },

    baseResolver (file, layout, { type, directory }) {
        matchAll(layout, type).forEach(link => {
            link = match(link, type)
            let regexp = new RegExp(`@${type}\\(${link}\\)`)
            layout = layout.replace(regexp, file.split('.')[0] === 'index' ? `${directory}/${link}.${type}` : `../${directory}/${link}.${type}`)
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

