const webpackConfig = require('./build/webpack.base.conf')
const wallabyWebpack = require('wallaby-webpack')

/* global chai */
module.exports = function (wallaby) {
  webpackConfig.resolve.alias = {'@': require('path').join(wallaby.projectCacheDir, 'src')}
  webpackConfig.externals = {vue: 'Vue'}
  webpackConfig.module.rules.find(r => r.loader === 'vue-loader').options.loaders.js = ''
  webpackConfig.plugins.push(new (require('webpack').LoaderOptionsPlugin)({test: /\.vue$/, sourceMap: false}))

  const wallabyPostprocessor = wallabyWebpack(webpackConfig)

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'node_modules/vue/dist/vue.js', instrument: false},
      {pattern: 'src/**/*.*', load: false},
      {pattern: 'src/**/*.spec.js', ignore: true}
    ],

    env: {
      kind: 'chrome'
    },

    tests: [
      {pattern: 'src/**/*.spec.js', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    testFramework: 'mocha',
    setup: function () {
      window.__moduleBundler.loadTests()
      window.sinon = sinon
      window.expect = chai.expect
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    }
  }
}
