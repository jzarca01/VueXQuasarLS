describe('Component: Form.vue', () => {
  before(() => { // runs once before all tests in the block
    cy.visit('http://localhost:8080/table')
  })

  beforeEach(() => { // runs before each test in the block
    cy.visit('http://localhost:8080/form')
  })

  it('should go back to previous page', () => { // backBtn executes router.go(-1) so it had to visit another url before
    cy.get('.layout-padding').find('button.q-btn').last().as('backBtn')
    cy.get('@backBtn').click()
    cy.location('pathname').should('not.include', 'form')
  })
})
