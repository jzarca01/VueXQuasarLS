module.exports = {
  'Table.vue: it should make the spinner visible': function (browser) {
    browser
      .url('http://localhost:8080/table')
      .waitForElementVisible('button[name="loadingButton"]', 1000)
      .click('button[name="loadingButton"]')
      .assert.visible('.q-spinner')
      .end()
  },

  'Table.vue: it should make the spinner invisible again': function (browser) {
    const toggleBtn = 'button[name="loadingButton"]'
    browser
      .url('http://localhost:8080/table')
      .waitForElementVisible(toggleBtn, 1000)
      .click(toggleBtn)
      .assert.visible('.q-spinner')
      .click(toggleBtn)
      .assert.elementNotPresent('.q-spinner')
      .end()
  },

  'Table.vue: it should go to form': function (browser) {
    const editBtn = 'button[name="editButton"]'
    browser
      .url('http://localhost:8080/table')
      .waitForElementVisible(editBtn, 1000)
      .click(editBtn)
      .assert.urlContains('form')
      .end()
  }
}
