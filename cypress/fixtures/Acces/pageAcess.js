class pageAcces {

    accesDubai() {
        cy.visit("/")
        cy.wait(3000)
        cy.get('#newsLetterSubscriptionClose > #newsLetterClear').click().wait(2000);
        cy.get('div[id="countrySelectionContent"]').then($popup => {
            if ($popup.length > 0) {
                cy.get('button[class="close"]').eq(0).click().wait(1000);

            } else {
                cy.get('div[class="top-bar"]').click();
            }
        });
    }

    closePopUp() {
        cy.get('div[id="countrySelectionContent"]').then($popup => {
            if ($popup.length > 0) {
                cy.get('button[class="close"]').eq(0).click({force: true}).wait(1000);

            } else {
                cy.get('div[class="top-bar"]').click();
            }
        });
    }

    logOut(){
        cy.visit("/")
        cy.wait(3000)
        cy.get('div[id="countrySelectionContent"]').then($popup => {
            if ($popup.length > 0) {
                cy.get('button[class="close"]').should('be.visible').eq(0).click().wait(1000);

            } else {
                cy.get('div[class="top-bar"]').click();
            }
        });
        cy.get('li[class="dropdown profile-line"]').click()
        cy.get('a[href="/logout"]').click()
        cy.wait(5000)
        cy.get('span[class="inner-sub"]').should('contain.text','Welcome back')
    }
    
}

export default pageAcces;