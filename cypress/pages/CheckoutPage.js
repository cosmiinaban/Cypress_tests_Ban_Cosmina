class CheckoutPage {
    visit() {
        cy.url().should('include', '/cart'); 
    }

    getCartProducts() {
        return cy.get('.cart_list .cart_item');
    }
    
    verifyCartHasNumberOfProducts(expectedNumber) {
        this.getCartProducts().should('have.length', expectedNumber);
    }
    
    verifyProductInCart(productName) {
        cy.get('.cart_list').should('contain', productName);
    }
    
    getProductQuantityByIndex(index = 0) {
        return this.getCartProducts()
          .eq(index)
          .find('[data-test="item-quantity"]');
    }
    
    verifyProductQuantity(index, expectedQuantity) {
        this.getProductQuantityByIndex(index)
          .should('have.text', expectedQuantity.toString());
    }

    verifyCartIsEmpty() {
        this.getCartProducts()
          .should('have.length', 0);
    }

    verifyProductNotInCart(productName) {
        cy.get('.cart_list').should('not.contain', productName);
    }
}

export default CheckoutPage;