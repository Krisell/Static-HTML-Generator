# Static-HTML-Generator
This project was created to simplify work with assignments in a basic web development course where server-side rendering, and thus code sharing using partials/layouts, was not an option.

The purpose is to avoid repetition of code that is shared between several pages, e.g. header, navigation and footer, while still generating static html-pages that will pass the course requirements.

# How to use

1. Add [`generator.js`](https://raw.githubusercontent.com/Krisell/Static-HTML-Generator/master/dist/generator.js) to your project root directory.

2. Create a directory `layouts` and create an html-file (e.g. master.html) that will work as the template for all pages. Since the content of this file is part of the assignment, I will not show a complete example here, but all you need is a complete standard HTML-file, and where content differs on different pages, use a yield-directive with `@yield(name)`.
For instance `@yield(title)` in the title-tag, and `@yield(content)` after navigation.

3. Create a directory `pages` where you place each page html-file. The first line in these files will specify what layout to use using the extends-directive, e.g. `@extends(master)`.
Page-specific content is then added in the corresponding sections, using `@section(content)` and `@endsection`.
An about.html-file could look like this:

   ![](docs/about.png)

4. Relative urls are generated correctly using the @link(name), @css(name) and @js(name) directives. This is necessary since index.html will be placed in the root directory whereas the other pages are placed in the html-directory (according to the course requirements).
For example:

    `<link rel="stylesheet" href="@css(style)">`

    `<script src="@js(index)"></script>`


5. The `active:name` directive will be rewritten to `active` if the current file corresponds to `name`(without .html) and the empty string otherwise. This can be useful to add an active-class to the current page in the navigation.
For example: `<li><a class="active:index" href="@link(index)">Start</a></li>`

6. Run `node generator.js`to generate the static html-files. All files found in `pages/` will be generated and put in the html-directory, except for index.html which will be placed in the root folder (but index.html should still be put in pages/).
If you add the `--watch`-flag, i.e. `node generator.js --watch`, the program will keep running and re-build whenever a file changes.

That's it. Just make sure you update the layout- and pages-files, and not the generated files, and you will save lots of time and avoid problems with broken links and different pages showing different versions of the navigation.


# A few notes
* The syntax is inspired by Laravel Blade, but feel free to suggest other conventions/directive-naming.
* I have only written a few unit tests yet and I will avoid larger refactoring until feature tests are in place (feel free to PR!)
* This a very early version and the API is likely to change.


# How to build
If you would like to modify the code, this is the build process:
1. Clone the repository
2. Install npm dev-dependencies using `npm install` from the project folder.
3. Optional: Run tests with `npm test`
4. Build with `npm run development` or `npm run production` (which also minifies the code). This generates the `dist/generator.js`-file that may be used in an HTML-project (i.e. the course assignment).


# Contributions
This is mostly a toy-project to help me with this specific course-assignment, but it's now also a great way to play around with GitHub. Please feel free to use this repo in the same way, i.e. you're welcome to create PRs, Issues etc. even if you're unsure if you've done it "correctly".
