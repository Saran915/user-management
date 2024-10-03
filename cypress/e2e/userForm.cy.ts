describe('User Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/user/create');
  });

  it('should fill out the form and submit successfully', () => {
    // fill form
    cy.get('#userName').type('john_doe');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#isAdmin').check();
    cy.get('#department').select('Marketing');

    // Submit form
    cy.get('button').contains('Save').click();

    // Verify the success message or redirection
    cy.url().should('equal', '/user');
    cy.get('.success-message')
      .should('be.visible')
      .and('contain', 'User saved successfully');
  });

  it('should validate required fields', () => {
    // Click the submit button without filling the form
    cy.get('button').contains('Save').click();

    // Check for validation error messages
    cy.get('.input-error').should('exist');
  });

  it('should reset the form', () => {
    // Fill out the form
    cy.get('#userName').type('john_doe');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');

    // Click the Reset button
    cy.get('button').contains('Reset').click();

    // Check that the fields are cleared
    cy.get('#userName').should('have.value', '');
    cy.get('#firstName').should('have.value', '');
    cy.get('#lastName').should('have.value', '');
  });

  it('should go back when clicking Exit button', () => {
    // Click the Exit button
    cy.get('button').contains('Exit').click();

    cy.url().should('include', '/user');
  });
});
