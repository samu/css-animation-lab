var filterCoffeeScript = require('broccoli-coffee');
var uglifyJavaScript = require('broccoli-uglify-js');
var compileSass = require('broccoli-sass');
var pickFiles = require('broccoli-static-compiler');
var concat = require('broccoli-concat');
var mergeTrees = require('broccoli-merge-trees');
var jade = require('broccoli-jade');
var env = require('broccoli-env').getEnv();

function prepareJs() {
  function pickCoffeeScripts(root) {
    tree = pickFiles(root, {
      srcDir: '/',
      destDir: '/js'
    })
    return filterCoffeeScript(tree, {})
  }

  var app = pickCoffeeScripts('app/js')

  var sourceTrees = [app]

  var appJs = new mergeTrees(sourceTrees, { overwrite: true })

  appJs = concat(appJs, {
    inputFiles: [
      '**/*.js'
    ],
    outputFile: '/js/app.js',
    separator: '\n',
    wrapInFunction: true
  })

  if (env === 'production') {
    appJs = uglifyJavaScript(appJs, {})
  }

  return appJs
}

function prepareCss() {
  var styles = pickFiles('app', {
    srcDir: '/styles',
    destDir: '/styles'
  })

  return compileSass([styles], '/styles/app.scss', 'css/app.css')
}

function prepareTemplates() {
  var templates = pickFiles('app', {
    srcDir: '/templates',
    files: ['**/*.jade'],
    destDir: '/templates'
  })
  return jade(templates, {pretty: true})
}

module.exports = mergeTrees([prepareJs(), prepareTemplates(), prepareCss()])
