import 'cypress-wait-until';

// COMMENT: Just an example on how to do a e2e test within the client-side app...

describe('Home view page navigation', () => {
    it('should visit home page', () => {
        cy.visit(Cypress.env('APP_HOME_URL'));
    });

    it('should navigate the application using the keyboard', () => {
        const repeatNthTimes = 5;
        const urlPattern = Cypress.env('APP_DETAIL_URL_REGEX_PATTERN');

        cy.visit(Cypress.env('APP_HOME_URL'));

        cy.get('[data-cy="loading"]').should('not.exist');
        cy.get('[data-cy="skeleton"]').should('not.exist');
        cy.get('[data-cy="main_container"]').should('be.visible');

        cy.waitUntil(() => cy.get('[tabindex="0"]').should('exist')).then(() => {
            cy.get('[data-cy="main_container"]').trigger('keyup', { key: 'ArrowDown' });

            for (let i = 0; i <= repeatNthTimes; i++) {
                cy.get('[data-cy="main_container"]').trigger('keyup', { key: 'ArrowRight' });
            }

            for (let i = 0; i <= repeatNthTimes; i++) {
                cy.get('[data-cy="main_container"]').trigger('keyup', { key: 'ArrowLeft' });
            }

            cy.get('[data-cy="tv-program-rail-item"]').first().trigger('keydown', { key: 'Enter' });
            cy.url().should('match', new RegExp(urlPattern));
        });
    });
});
