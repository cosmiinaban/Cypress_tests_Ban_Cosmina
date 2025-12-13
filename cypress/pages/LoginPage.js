class LoginPage {
     
    usernameInput() {
        return cy.get('[data-test="username"]')
    }
  
    passwordInput() {
        return cy.get('[data-test="password"]')
    }
    
    visitLogin() {
        cy.visit('https://www.saucedemo.com/');  
    }

    loginAs(username,password) {
        this.usernameInput().clear().type(username)
        this.passwordInput().clear().type(password)
    }

    clickLogin() {
      cy.get('[data-test="login-button"]').click(); 
    }
  
    getErrorMessage() {
      return cy.get('[data-test="error"]'); 
    }

  }
  
  export default LoginPage;
  