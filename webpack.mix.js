const { mix } = require('laravel-mix');

mix.webpackConfig({ target: 'node'})

mix.js('src/generator.js', 'dist/generator.js')
