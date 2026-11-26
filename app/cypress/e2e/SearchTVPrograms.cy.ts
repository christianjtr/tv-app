import { stringify } from 'qs';

// COMMENT: Just an example on how to do a e2e test within the client-side app...

describe('Search view page', () => {
    const query = '__SOME__TV__PROGRAM__';

    it('should visit search page', () => {
        cy.visit(Cypress.env('APP_SEARCH_URL'));
    });

    it('should search a tv program correctly', () => {
        cy.visit(Cypress.env('APP_SEARCH_URL'));

        cy.get('[data-cy="search_input"]').type(query);
        cy.get('[data-cy="btn_search"]').click();
        cy.url().should('include', stringify({ query }));
        cy.get('[data-cy="tv-program-rail-item"]').should('have.length', 1).and('contain.text', 'Game of Thrones');
    });

    it('should search a tv program correctly and navigate to program detail', () => {
        const urlPattern = Cypress.env('APP_DETAIL_URL_REGEX_PATTERN');

        cy.visit(Cypress.env('APP_SEARCH_URL'));

        cy.get('[data-cy="search_input"]').type(query);
        cy.get('[data-cy="btn_search"]').click();
        cy.get('[data-cy="tv-program-rail-item"]')
            .first()
            .click()
            .then(() => {
                cy.url().should('match', new RegExp(urlPattern));
            });
        cy.get('h1').should('contain.text', 'Game of Thrones');
    });

    it('follows search query changes from browser history and rejects unmatched queries', () => {
        cy.visit(Cypress.env('APP_SEARCH_URL'));
        cy.get('[data-cy="search_input"]').type(query);
        cy.get('[data-cy="btn_search"]').click();
        cy.get('[data-cy="tv-program-rail-item"]').should('have.length', 1).and('contain.text', 'Game of Thrones');

        cy.get('[data-cy="search_input"]').type('__NO_MATCH__');
        cy.get('[data-cy="btn_search"]').click();
        cy.get('[data-cy="tv-program-rail-item"]').should('not.exist');

        cy.go('back');
        cy.url().should('include', stringify({ query }));
        cy.get('[data-cy="tv-program-rail-item"]').should('have.length', 1).and('contain.text', 'Game of Thrones');
    });
});
