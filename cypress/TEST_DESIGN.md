This project implements an Automated End-to-End (E2E) test suite using Cypress and the Page Object Model (POM) pattern. It covers two distinct scenarios:
1. eMAG E2E Flow: Added tests for a shopping flow involving filtering, sorting, and price validation.
2. AirportLabs Site Validation: Testing the integrity of the website.

I implemented the Page Object Model (POM) to separate the test logic from the technical implementation of selectors. By creating separate Page Objects for EmagPage.js and AirportPage.js, the suite remains organized as new domains or pages are added. Also, any UI change on the AirportLabs site requires a fix in only one place, ensuring high maintainability.


What I would add with 2 more hours:
CI integration (Adding a GitHub Actions job to run npx cypress run on PRs);
Replace fragile class-based selectors with stable data attributes (ex: data-cy);
Add a retry logic for the flaky tests, add screenshots/videos collection on failure for faster debugging.


Easy to maintain:
Page object methods, fixtures and test data are centralized and easy to mantain.

Fragile to maintain:
CSS-class selectors, tests that depend on external websites and explicit cy.wait() values -> network errors or small UI changes can cause flakiness. 
Price parsing may break if the site changes currency or formatting.
Cross-page flows with modals/navigation that encapsulate modal behaviors and cart flows are integration-heavy and more likely to trigger intermittent failures.