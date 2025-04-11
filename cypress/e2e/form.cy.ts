describe('Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should load the contact form', () => {
    cy.get('form').should('exist');
    cy.get('[data-cy="fullName"]').should('exist');
    cy.get('[data-cy="creditCard"]').should('exist'); // Hidden input
    cy.get('[data-cy="message"]').should('exist');
  });

  it('should show validation errors when form fields are invalid', () => {
    // Clear the form first (since it's pre-populated with mock data)
    cy.get('[data-cy="clear-form"]').click(); // Clear form button
    
    // Input invalid values and trigger validation by focusing and blurring
    cy.get('[data-cy="fullName"]').type('Jo').blur();
    
    // Force a form update by interacting with another field
    cy.get('[data-cy="message"]').focus().blur();
    
    // Check that an error is shown for the name field
    cy.get('form').find('.invalid-feedback').should('be.visible');
    
    // Fix the input
    cy.get('[data-cy="fullName"]').clear().type('John Smith').blur();
    
    // Check that the field now shows valid
    cy.get('[data-cy="fullName"]').should('have.class', 'ng-valid');
  });

  it('should display masked credit card information', () => {
    // Reset to mock data
    cy.get('[data-cy="reset-to-mock"]').click();
    
    // Look for masked credit card in the displayed form values
    cy.contains('span', '4111 **** **** 1111').should('exist');
  });

  it('should toggle credit card visibility', () => {
    // Reset to mock data to ensure consistent state
    cy.get('[data-cy="reset-to-mock"]').click();
    
    // Get the button that toggles credit card visibility
    cy.get('[data-cy="toggle-cc-display-visibility"]').click();
    
    // Now the displayed value should contain the full mock credit card number
    cy.contains('span', '4111111111111111').should('exist');
    
    // Click again to hide
    cy.get('[data-cy="toggle-cc-display-visibility"]').click();
    
    // Now it should be masked again (contains asterisks)
    cy.contains('span', '****').should('exist');
  });

  it('should submit a valid form successfully', () => {
    // Spy on console.log
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });
    
    // Reset to mock data
    cy.get('[data-cy="reset-to-mock"]').click();
    
    // The form should now be populated with valid mock data
    // Just submit it
    cy.get('[data-cy="submit-form"]').click();
    
    // Verify console.log was called
    cy.get('@consoleLog').should('be.calledWith', 'Form submitted with unmasked credit card:', '4111111111111111');
    
    // Form should be reset
    cy.get('[data-cy="fullName"]').should('have.value', '');
  });

  it('should clear the form completely', () => {
    // Reset to mock data first to ensure the form has values
    cy.get('[data-cy="reset-to-mock"]').click();
    
    // Verify form has values
    cy.get('[data-cy="fullName"]').should('have.value', 'John Doe');
    
    // Click clear form button
    cy.get('[data-cy="clear-form"]').click();
    
    // Verify all fields are empty
    cy.get('[data-cy="fullName"]').should('have.value', '');
    cy.get('[data-cy="message"]').should('have.value', '');
    cy.get('[data-cy="creditCard"]').should('have.value', '');
  });

  it('should reset to mock data correctly', () => {
    // First clear the form
    cy.get('[data-cy="clear-form"]').click();
    
    // Verify form is empty
    cy.get('[data-cy="fullName"]').should('have.value', '');
    
    // Click reset to mock data
    cy.get('[data-cy="reset-to-mock"]').click();
    
    // Verify mock data is loaded
    cy.get('[data-cy="fullName"]').should('have.value', 'John Doe');
    cy.get('[data-cy="message"]').should('not.have.value', '');
    
    // Check the form values display section
    cy.contains('Is Form Valid: Yes').should('exist');
    cy.contains('Using Mock Data: Yes').should('exist');
  });

  it('should validate minimum field constraints (name length)', () => {
    // Clear the form
    cy.get('[data-cy="clear-form"]').click();
    
    // Test name with exact minimum length (3 chars)
    cy.get('[data-cy="fullName"]').type('Bob');
    cy.get('[data-cy="fullName"]').focus().blur();
    
    // Wait and verify this specific field is valid
    cy.wait(300);
    cy.get('[data-cy="fullName"]').should('have.class', 'ng-valid');
  });
  
  it('should validate minimum field constraints (message length)', () => {
    // Clear the form
    cy.get('[data-cy="clear-form"]').click();
    
    // Test message with exact minimum length (10 chars)
    cy.get('[data-cy="message"]').type('0123456789');
    cy.get('[data-cy="message"]').focus().blur();
    
    // Wait and verify this specific field is valid
    cy.wait(300);
    cy.get('[data-cy="message"]').should('have.class', 'ng-valid');
  });
}); 