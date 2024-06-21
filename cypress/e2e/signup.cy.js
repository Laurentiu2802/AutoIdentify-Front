describe('Sign Up Page', () => {
    beforeEach(() => {
      // Visit the sign-up page before each test
      cy.visit('http://localhost:5173/SignUp');
    });
  
    it('should sign up successfully with valid credentials', () => {
      // Mock the API response for a successful sign-up
      cy.intercept('POST', '**/users', {
        statusCode: 200,
        body: {
          id: 1,
          username: 'validUser',
          description: 'Valid description'
        }
      }).as('signUpRequest');
  
      // Enter valid username, password, and description
      cy.get('[data-testid="username"]').type('validUser');
      cy.get('[data-testid="password"]').type('validPassword');
      cy.get('[data-testid="description"]').type('Valid description');
  
      // Stub window.alert
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert');
      });
  
      // Submit the form
      cy.get('form').submit();
  
      // Wait for the API call to complete
      cy.wait('@signUpRequest');
  
      // Check if sign-up was successful
      cy.get('@alert').should('have.been.calledWith', 'User created');
    });
  
    it('should navigate to the login page', () => {
      // Click the login link
      cy.get('a[href="/Login"]').click();
  
      // Check if the URL is correct
      cy.url().should('eq', 'http://localhost:5173/Login');
    });
  });
  