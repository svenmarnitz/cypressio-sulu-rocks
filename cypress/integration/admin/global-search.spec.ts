import { adminPage, globalSearchPage, loginPage } from "../../support/pages"


describe('Use global search', () => {
    beforeEach(() => {
        loginPage.visit()
        cy.intercept('/admin/login').as('login')
        loginPage.doLoginAsAdmin()
        cy.wait('@login')
        adminPage.menuSearchButton.click()
    })

    it('show search page', () => {
        adminPage.menuSearchButton.click()
        globalSearchPage.searchDropDown.should('be.visible').and('contain', 'Everything')
        globalSearchPage.searchInputField.should('be.visible')
        globalSearchPage.searchIcon.should('be.visible')
    })

    it('type "Blog" in input and reset', () => {
        globalSearchPage.searchInputField.type('Blog').and('have.value', 'Blog')
        globalSearchPage.searchInputReset.first().click()
        globalSearchPage.searchInputField.should('have.value', '')
    })

    it('search in everything per {enter}', () => {
        cy.intercept('/admin/search/query?q=*').as('search')
        globalSearchPage.searchInputField.type('Blog{enter}')
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 2)
    })

    it('search in everything per button', () => {
        cy.intercept('/admin/search/query?q=*').as('search')
        globalSearchPage.searchInputField.type('Blog')
        globalSearchPage.searchIcon.click();
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 2)
    })

    it('click dropdown select Snippets', () => {
        globalSearchPage.clickCategoryDropdown('Snippets')
        cy.intercept('/admin/search/query?q=*').as('search')
        globalSearchPage.searchInputField.type('Demo{enter}')
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 2)
    })

    it('click dropdown select Media', () => {
        globalSearchPage.clickCategoryDropdown('Media')

        cy.intercept('/admin/search/query?q=*').as('search')
        globalSearchPage.searchInputField.type('Demo{enter}')
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 0)
    })

    it('search again in other category', () => {
        cy.intercept('/admin/search/query?q=*').as('search')

        globalSearchPage.clickCategoryDropdown('Snippets')
        globalSearchPage.searchInputField.type('Demo{enter}')
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 2)

        globalSearchPage.clickCategoryDropdown('Media')
        cy.wait('@search')
        cy.get('div[class^=search-result--]').should('have.length', 0)
    })
})