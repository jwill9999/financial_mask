describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Angular 19 with Bootstrap 5')
  })
})
