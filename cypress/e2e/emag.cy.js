import EmagPage from '../pages/EmagPage';

describe('eMAG E2E Shopping Flow - TV & Accessory', () => {
    const BRAND = 'Samsung';
    const BASE_URL = 'https://www.emag.ro';
    const TELEVIZOARE_PATH = '/televizoare/c';
    const CART_PATH = '/cart/products';
    const PRODUCT_PRICE_SELECTOR = '.product-new-price';

    beforeEach(() => {
        cy.viewport(1280, 1000);
        cy.visit(BASE_URL);
    });

    it('Should add products to cart and verify', () => {
        cy.visit(`${BASE_URL}${TELEVIZOARE_PATH}`);

        //Add TV
        EmagPage.brandSamsungFilter.click({ force: true });
        cy.wait(2000); 
        EmagPage.ratingThreeStars.click({ force: true });
        EmagPage.sortBy('Pret descrescator');
        cy.wait(2000);
        EmagPage.getFormattedPrice(cy.get(PRODUCT_PRICE_SELECTOR).first()).as('tvPrice');
        EmagPage.addToCartBtn.click({ force: true });
        cy.get('.product-purchased-modal', { timeout: 10000 }).should('have.class', 'in');
        cy.get('body').type('{esc}'); 
        cy.wait(1000);

        //Add accessory
        EmagPage.searchInput.type(`suport tv ${BRAND}{enter}`);
        EmagPage.ratingThreeStars.click({ force: true });
        EmagPage.sortBy('Pret crescator');
        EmagPage.getFormattedPrice(cy.get(PRODUCT_PRICE_SELECTOR).first()).as('accPrice');
        EmagPage.addToCartBtn.click({ force: true });
        cy.wait(1000);

        //Go to cart and verify
        cy.visit(`${BASE_URL}${CART_PATH}`);
        cy.wait(1000);
        EmagPage.firstProductTitleInCart.should('contain.text', BRAND);
        EmagPage.getDeliveryPrice(EmagPage.deliveryCostElement).as('deliveryCost');
        EmagPage.getFormattedPrice(EmagPage.cartTotal).then((actualTotal) => {
            cy.get('@tvPrice').then((tvPrice) => {
                cy.get('@accPrice').then((accPrice) => {
                    cy.get('@deliveryCost').then((deliveryPrice) => {
                        const expectedTotal = tvPrice + accPrice + deliveryPrice;
                        cy.log(`TV: ${tvPrice} + Acc: ${accPrice} + Livrare: ${deliveryPrice} = ${expectedTotal}`);
                        expect(actualTotal).to.be.eq(expectedTotal);
                    });
                });
            });
        
        });
});
});