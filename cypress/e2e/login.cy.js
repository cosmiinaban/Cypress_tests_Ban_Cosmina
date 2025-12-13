import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('Login Tests', () => {

  it('Should login with valid credentials', () => {
    loginPage.visitLogin();
    loginPage.loginAs('standard_user','secret_sauce');
    loginPage.clickLogin();
    cy.url().should('include', '/inventory');
    cy.contains('Products').should('be.visible'); 
  });


  it('Should display the error for invalid credentials', () => {
    loginPage.visitLogin();
    loginPage.loginAs('wrong_user','wrong_pass');
    loginPage.clickLogin();
    loginPage.getErrorMessage().should('be.visible')
     .and('contain', 'Epic sadface: Username and password do not match any user in this service'); 
  });

});
