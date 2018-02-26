var webpackConfig = require('../build/webpack.dev.conf');

require('jsdom-global')()
require('mock-local-storage')
// global.expect = require('expect')

module.exports = function (config) {
  config.set({
    // To run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Chrome', 'IE'],
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      './index.js',
      '../node_modules/chai/chai.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
