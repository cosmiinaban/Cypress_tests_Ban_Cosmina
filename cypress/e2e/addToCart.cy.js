import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CheckoutPage from '../pages/CheckoutPage';

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const checkoutPage = new CheckoutPage();

describe('Add to Cart & Checkout flow', () => {
    const username = 'standard_user';
    const password = 'secret_sauce';
    const productName = 'Sauce Labs Backpack';
    const productId= 'sauce-labs-backpack';

    beforeEach(() => {
        loginPage.visitLogin();
        loginPage.visitLogin();
        loginPage.loginAs('standard_user','secret_sauce');
        loginPage.clickLogin();
        productsPage.visitProducts();
    });
    
    it('Should add a product to the cart and verify it in checkout', () => {
        productsPage.addProductToCart(productId);
        productsPage.verifyCartIcon(1)
        productsPage.openCheckout();
        checkoutPage.verifyCartHasNumberOfProducts(1);
        checkoutPage.verifyProductInCart(productName);
        checkoutPage.verifyProductQuantity(0, 1);
        productsPage.continueShopping();
    });

    it('Should remove a product from the cart', () => {
        productsPage.addProductToCart(productId);
        productsPage.removeProductFromCart(productId);
        productsPage.getButtonText(productId, 'add-to-cart').should('exist');
        productsPage.openCheckout();
        checkoutPage.verifyProductNotInCart(productName);
        checkoutPage.verifyCartIsEmpty();
    });

});