const seleniumServer = require('selenium-server')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const edgedriver = require('edgedriver')
const PKG = require('./package.json') // so we can get the version of the project
const SCREENSHOT_PATH = './node_modules/nightwatch/screenshots/' + PKG.version + '/'

const config = {
  'src_folders': ['src/e2e'],
  'output_folder': 'reports',
  'custom_commands_path': '',
  'custom_assertions_path': '',
  'page_objects_path': '',
  'globals_path': '',

  'selenium': {
    'start_process': true,
    'server_path': seleniumServer.path,
    'log_path': '',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.gecko.driver': geckodriver.path,
      'webdriver.edge.driver': edgedriver.path
    }
  },

  'test_settings': {
    'default': {
      'launch_url': 'http://localhost',
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': false,
        'path': SCREENSHOT_PATH
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'marionette': true
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome'
      }
    },

    'edge': {
      'desiredCapabilities': {
        'browserName': 'MicrosoftEdge'
      }
    }
  }
}

module.exports = config
