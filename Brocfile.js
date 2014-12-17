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

  var app = pickCoffeeScripts('www_source/js')

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
  var styles = pickFiles('www_source', {
    srcDir: '/styles',
    destDir: '/styles'
  })

  var lib = pickFiles('www_source', {
    srcDir: '/lib/ionic/scss',
    destDir: '/lib'
  })
  return compileSass([styles, lib], '/styles/app.scss', 'css/app.css')
}

function prepareTemplates() {
  var templates = pickFiles('www_source', {
    srcDir: '/templates',
    files: ['**/*.jade'],
    destDir: '/templates'
  })
  return jade(templates, {pretty: true})
}

function copyRemainingAssets() {
  return pickFiles('www_source', {
     srcDir: '/',
     files: ['**/*.html', 'img/*.*', 'lib/**/*.*'  ],
     destDir: '.'
  });
}

module.exports = mergeTrees([prepareJs(), prepareTemplates(), prepareCss(), copyRemainingAssets()])
