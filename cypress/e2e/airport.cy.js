import { airportPage } from '../pages/AirportPage';

describe('Part 1 | AirportLabs Tests', () => {
  const VIEWPORT_DESKTOP = { width: 1280, height: 720 };
  const SCROLL_BOTTOM_DURATION = 3000;
  const SCROLL_MEDIUM_DURATION = 2000;
  const SCROLL_SHORT_DURATION = 1000;
  const WAIT_SHORT = 1000;
  const WAIT_LONG = 3000;
  const ACCENT_COLOR = 'rgb(82, 206, 147)';

  beforeEach(() => airportPage.visit());

  it('Scenario 1: Section title verification', () => {
    cy.scrollTo('bottom', { duration: SCROLL_BOTTOM_DURATION });
    cy.verifyVisibilityByDevice('h2.h2', 'desktop');
    airportPage.getSectionTitle()
      .scrollIntoView()
      .wait(WAIT_LONG)
      .should('be.visible')
      .and('have.text', 'Our activity in numbers')
      .and('have.css', 'opacity', '1')
      .should('have.css', 'font-size', '40px')
      .and('have.css', 'font-weight', '300');

    cy.verifyVisibilityByDevice('h2.h2', 'mobile');
  });

  it('Scenario 2: Activity in Numbers ', () => {
    cy.scrollTo('bottom', { duration: SCROLL_MEDIUM_DURATION });
    cy.fixture('stats').then((data) => {
      airportPage.getStatValue()
        .should('contain', data.val)
        .and('have.css', 'color', ACCENT_COLOR);
      airportPage.getStatLabel().should('contain', data.label);
    });
  });

  it('Scenario 3: Social Media Links', () => {
    const socialData = [
    { url: 'https://www.facebook.com/AirportLabs', domain: 'facebook.com' },
    { url: 'https://www.instagram.com/airportlabspeople/', domain: 'instagram.com' },
    { url: 'https://www.linkedin.com/company/airportlabs/', domain: 'linkedin.com' }
    ];
    cy.scrollTo('bottom', { duration: SCROLL_SHORT_DURATION });
    airportPage.getSocialLinks().each(($el, index) => {
      cy.wrap($el).should('have.attr', 'href', socialData[index].url);
      cy.wrap($el).invoke('attr', 'href').should('contain', socialData[index].domain);
      cy.wrap($el).should('have.attr', 'target', '_blank');
    });
  });

  it('Scenario 4: Logo & Negative Assertion', () => {
    cy.viewport(VIEWPORT_DESKTOP.width, VIEWPORT_DESKTOP.height);
    airportPage.getLogo()
      .should('exist')
      .wait(WAIT_SHORT)
      .and('have.attr', 'src')
      .then((src) => {
        expect(src).to.not.be.empty;
      });

    airportPage.getLogo().and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
      expect($img[0].naturalHeight).to.be.greaterThan(0);
    });

    airportPage.getLogo().then(($img) => {
      expect($img[0].naturalWidth).to.not.equal(0);
    });

    airportPage.getLogo().should('not.have.attr', 'src', 'placeholder.svg');
  });

  it('Scenario 5: Navigation - Get in Touch', () => {
    airportPage.getInTouchBtn().first().click();
    cy.url().should('include', '/other/get-in-touch');
    cy.get('h1').should('be.visible'); 
  });
});