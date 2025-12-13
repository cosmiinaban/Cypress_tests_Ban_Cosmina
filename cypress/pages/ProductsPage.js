class ProductsPage {

    visitProducts() {
      cy.url().should('include', '/inventory'); 
    }
  
    addProductToCart(productId) {
      cy.get(`[data-test="add-to-cart-${productId}"]`).click();
    }
  
    removeProductFromCart(productId) {
      cy.get(`[data-test="remove-${productId}"]`).click();
    }
  
    getButtonText(productId, state) {
        // state is 'add-to-cart' or 'remove'
        return cy.get(`[data-test="${state}-${productId}"]`)
    }
    
    getProductTitle(productName) {
        return cy.contains('[data-test$="title-link"]', productName).invoke('text');
    }

    openCheckout() {
      cy.get('[data-test="shopping-cart-link"]').click()
    }

    verifyCartIcon(nr) {
        return cy.get('[data-test="shopping-cart-badge"]').should('contain', nr);
    }      

    continueShopping() {
        return cy.get('[data-test="continue-shopping"]').click()
    }

  }

  export default ProductsPage;
  