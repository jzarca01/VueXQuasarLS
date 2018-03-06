module.exports = {
  'Hello.vue: it should assert that <title> is correct': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.title('Boilerplate Vue + Quasar + Vuex + Mocha')
      .end()
  },

  'Hello.vue: it should go to table': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('a[href="/table"]', 1000)
      .click('a[href="/table"]')
      .assert.urlContains('table')
      .end()
  },

  'Hello.vue: it should go to form': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('a[href="/form"]', 1000)
      .click('a[href="/form"]')
      .assert.urlContains('form')
      .end()
  }
}
