Cypress.Commands.add('verifyVisibilityByDevice', (selector, device = 'desktop') => {
  if (device === 'mobile') {
    cy.viewport('iphone-xr');
  } else {
    cy.viewport(1920, 1080);
  }
  cy.get(selector).should('be.visible');
});
