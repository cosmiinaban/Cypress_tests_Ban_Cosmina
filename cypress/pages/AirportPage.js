const BASE_URL = 'https://airportlabs.com/';

const SELECTORS = {
  sectionTitle: '.container-8-copy.w-container h2.h2',
  statValue: 'h2.h2.green',
  statLabel: 'h4.h4',
  socialContainer: '.div-block-60',
  socialLink: 'a.logo-footer-container',
  logo: '.navbar-row-2 img.image-2',
  getInTouchBtn: 'a[href="/other/get-in-touch"]'
};

export class AirportPage {
  visit() {
    return cy.visit(BASE_URL);
  }

  getSectionTitle() {
    return cy.get(SELECTORS.sectionTitle);
  }

  getStatValue() {
    return cy.get(SELECTORS.statValue);
  }

  getStatLabel() {
    return cy.get(SELECTORS.statLabel);
  }

  getSocialContainer() {
    return cy.get(SELECTORS.socialContainer);
  }

  getSocialLinks() {
    return this.getSocialContainer().find(SELECTORS.socialLink);
  }

  getLogo() {
    return cy.get(SELECTORS.logo);
  }

  getInTouchBtn() {
    return cy.get(SELECTORS.getInTouchBtn);
  }
}

export const airportPage = new AirportPage();