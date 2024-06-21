describe('Log In Page', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login');
    });
  
    it('should log in successfully with valid credentials', () => {
      // Mock the API response for a successful login
      cy.intercept('POST', '**/users/tokens', {
        statusCode: 200,
        body: {
          token: 'fake-jwt-token'
        }
      }).as('loginRequest');
  
      // Enter valid username and password
      cy.get('[data-testid="username"]').type('validUser');
      cy.get('[data-testid="password"]').type('validPassword');
      
      // Submit the form
      cy.get('form').submit();
      
      // Wait for the API call to complete
      cy.wait('@loginRequest');
  
      // Check if login was successful (adjust according to your app's behavior, e.g., check URL, existence of an element, etc.)
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.window().then((window) => {
        expect(window.localStorage.getItem('accessToken')).to.exist;
      });
    });
  
    it('should show an error message with invalid credentials', () => {
      // Mock the API response for a failed login
      cy.intercept('POST', '**/users/tokens', {
        statusCode: 401,
        body: {
          message: 'Invalid credentials'
        }
      }).as('loginRequest');
  
      // Enter invalid username and password
      cy.get('[data-testid="username"]').type('invalidUser');
      cy.get('[data-testid="password"]').type('invalidPassword');
      
      // Submit the form
      cy.get('form').submit();
      
      // Wait for the API call to complete
      cy.wait('@loginRequest');
  
      // Check if an error message is displayed (adjust according to your app's behavior)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid credentials');
      });
    });
  });
  