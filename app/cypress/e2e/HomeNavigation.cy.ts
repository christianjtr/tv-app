import 'cypress-wait-until';

// COMMENT: Just an example on how to do a e2e test within the client-side app...

describe('Home view page navigation', () => {
    it('should visit home page', () => {
        cy.visit(Cypress.expose('APP_HOME_URL'));
    });

    it('navigates spatially using all arrow keys', () => {
        const urlPattern = Cypress.expose('APP_DETAIL_URL_REGEX_PATTERN');
        const movieItems = '[data-element="tv-program-rail"]:first-of-type [data-cy="tv-program-rail-item"]';
        const tvItems = '[data-element="tv-program-rail"]:last-of-type [data-cy="tv-program-rail-item"]';

        cy.visit(Cypress.expose('APP_HOME_URL'));

        cy.get('[data-cy="loading"]').should('not.exist');
        cy.get('[data-cy="skeleton"]').should('not.exist');
        cy.get('[data-cy="main_container"]').should('be.visible');
        cy.get('[data-cy="tv-program-rail-item"]').should('be.visible');

        cy.get('[data-testid="btn_home"]').focus();
        cy.press('ArrowRight');
        cy.focused().should('have.attr', 'data-testid', 'btn_search');
        cy.press('ArrowDown');
        cy.focused().should('have.attr', 'data-cy', 'tv-program-rail-item');

        cy.get(`${movieItems}:nth-of-type(2)`)
            .invoke('attr', 'aria-label')
            .then((secondMovieLabel) => {
                cy.get(`${movieItems}:first-of-type`).focus();
                cy.press('ArrowRight');
                cy.focused().should('have.attr', 'aria-label', secondMovieLabel);
            });

        cy.get(`${movieItems}:first-of-type`)
            .invoke('attr', 'aria-label')
            .then((movieLabel) => {
                cy.get(`${tvItems}:first-of-type`)
                    .invoke('attr', 'aria-label')
                    .then((tvLabel) => {
                        cy.get(`${movieItems}:first-of-type`).focus();
                        cy.press('ArrowDown');
                        cy.focused().should('have.attr', 'aria-label', tvLabel);
                        cy.press('ArrowUp');
                        cy.focused().should('have.attr', 'aria-label', movieLabel);
                        cy.press('ArrowLeft');
                        cy.focused().should('have.attr', 'aria-label', movieLabel);
                        cy.focused().click();
                        cy.url().should('match', new RegExp(urlPattern));
                    });
            });
    });
});
