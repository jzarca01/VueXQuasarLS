describe('Component: Table.vue', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/table')
  })

  it('should make the spinner visible', () => {
    cy.get('.layout-padding').find('button.q-btn').first().as('toggleBtn')
    cy.get('@toggleBtn').click()
    cy.get('.q-spinner').should('be.visible')
  })

  it('should make the spinner invisible again', () => {
    cy.get('.layout-padding').find('button.q-btn').first().as('toggleBtn')
    cy.get('@toggleBtn').click()
    cy.get('@toggleBtn').click()
    cy.get('.q-spinner').should('not.be.visible')
  })

  it('should go to form', function () {
    cy.get('.content').find('button.q-btn').first().as('addPostBtn')
    cy.get('@addPostBtn').click()
    cy.location('pathname').should('include', 'form')
  })
})
