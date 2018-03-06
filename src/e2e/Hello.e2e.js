describe('Component: Hello.vue', function () {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })
  
  it('should assert that <title> is correct', function () {
    cy.title().should('include', 'Boilerplate')
  })

  it('should go to table', function () {
    cy.get('.layout-padding').find('a[href="/table"]').as('tableLink')
    cy.get('@tableLink').click()
    cy.location('pathname').should('include', 'table')
  })

  it('should go to form', function () {
    cy.get('.layout-padding').find('a[href="/form"]').as('formLink')
    cy.get('@formLink').click()
    cy.location('pathname').should('include', 'form')
  })
})
