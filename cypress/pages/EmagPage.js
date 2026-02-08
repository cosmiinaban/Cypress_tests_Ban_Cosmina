const SELECTORS = {
    searchInput: '#searchboxTrigger',
    brandSamsung: 'a[data-name="Samsung"]',
    ratingThreeStars: 'a[data-option-id="3-5"]',
    sortBtn: '.sort-control-btn',
    sortItem: '.sort-control-item',
    addToCartBtn: '.yeahIWantThisProduct',
    modalClose: '.product-purchased-modal.in .close',
    cartTotal: '[data-test="summaryTotal"]',
    productPrice: '.product-new-price',
    firstProductTitleInCart: '.main-product-title',
    deliveryCost: '.order-summary-shipping-cost'
};

class EmagPage {
    get searchInput() {
        return cy.get(SELECTORS.searchInput);
    }

    get brandSamsungFilter() {
        return cy.get(SELECTORS.brandSamsung);
    }

    get ratingThreeStars() {
        return cy.get(SELECTORS.ratingThreeStars);
    }

    get sortBtn() {
        return cy.get(SELECTORS.sortBtn).filter(':visible').first();
    }

    get addToCartBtn() {
        return cy.get(SELECTORS.addToCartBtn).filter(':visible').first();
    }

    get modalCloseBtn() {
        return cy.get(SELECTORS.modalClose).filter(':visible').first();
    }

    get cartTotal() {
        return cy.get(SELECTORS.cartTotal);
    }

    get firstProductTitleInCart() {
        return cy.get(SELECTORS.firstProductTitleInCart).first();
    }

    get deliveryCostElement() {
        return cy.get(SELECTORS.deliveryCost);
    }

    sortBy(optionText) {
        this.sortBtn.click({ force: true });
        cy.get(SELECTORS.sortItem).contains(optionText).click({ force: true });
        cy.wait(1500);
    }

    getFormattedPrice(element) {
        return element.invoke('text').then((text) => this._parsePrice(text));
    }

    getDeliveryPrice(element) {
        return element.invoke('text').then((text) => {
            const upperText = (text || '').toUpperCase();
            if (upperText.includes('GRATUIT')) {
                return 0;
            }
            return this._parsePrice(text) || 0;
        });
    }

    _parsePrice(text = '') {
        const cleaned = String(text)
            .replace(/Lei/gi, '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim();
        const parsed = parseFloat(cleaned);
        return Number.isFinite(parsed) ? parsed : NaN;
    }
}

export default new EmagPage();