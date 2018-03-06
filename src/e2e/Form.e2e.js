module.exports = {
  'Form.vue: it should go back to previous page': function (browser) {
    browser
      .url('http://localhost:8080')
      .url('http://localhost:8080/form')
      .waitForElementVisible('body', 1000)
      .click('button[name="cancelButton"]')
      .assert.urlEquals('http://localhost:8080/')
      .end()
  }
}
