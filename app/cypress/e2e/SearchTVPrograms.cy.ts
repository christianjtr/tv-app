import { stringify } from 'qs';

// COMMENT: Just an example on how to do a e2e test within the client-side app...

describe('Search view page', () => {
    const query = '__SOME__TV__PROGRAM__';

    it('should visit search page', () => {
        cy.visit(Cypress.expose('APP_SEARCH_URL'));
    });

    it('restores a deep link redirected by GitHub Pages', () => {
        const appHomeURL = Cypress.expose('APP_HOME_URL');
        const route = `/search?query=${query}`;

        cy.visit(`${appHomeURL}/?__spa_route=${encodeURIComponent(route)}`);

        cy.location('pathname').should('eq', '/tv-app/search');
        cy.location('search').should('eq', `?query=${query}`);
        cy.get('[data-cy="tv-program-rail-item"]').should('have.length', 1).and('contain.text', 'Game of Thrones');
    });

    it('shows an error when a search request fails', () => {
        cy.visit(`${Cypress.expose('APP_SEARCH_URL')}?query=__API_ERROR__`);

        cy.get('[role="alert"]').should('contain.text', 'Some search results could not be loaded');
        cy.get('[data-cy="tv-program-rail-item"]').should('not.exist');
    });

    it('shows an error when a detail request fails', () => {
        cy.visit(`${Cypress.expose('APP_HOME_URL')}/tv-shows/999999`);

        cy.get('[role="alert"]').should('contain.text', 'Could not load this title');
    });

    it('renders a TV show correctly when its episode and season counts are zero', () => {
        cy.visit(`${Cypress.expose('APP_HOME_URL')}/tv-shows/999998`);

        cy.contains('0 seasons').should('be.visible');
        cy.contains('0 episodes').should('be.visible');
        cy.get('#imdb_link').should('not.exist');
        cy.contains('undefined min.').should('not.exist');
    });

    it('should search a tv program correctly', () => {
        cy.visit(Cypress.expose('APP_SEARCH_URL'));

        cy.get('[data-cy="search_input"]').type(query);
        cy.get('[data-cy="btn_search"]').click();
        cy.url().should('include', stringify({ query }));
        cy.get('[data-cy="tv-program-rail-item"]').should('have.length', 1).and('contain.text', 'Game of Thrones');
    });

    it('should search a tv program correctly and navigate to program detail', () => {
        const urlPattern = Cypress.expose('APP_DETAIL_URL_REGEX_PATTERN');

        cy.visit(Cypress.expose('APP_SEARCH_URL'));

        cy.get('[data-cy="search_input"]').type(query);
        cy.get('[data-cy="btn_search"]').click();
        cy.get('[data-cy="tv-program-rail-item"]')
            .first()
            .click()
            .then(() => {
                cy.url().should('match', new RegExp(urlPattern));
            });
        cy.get('h1').should('contain.text', 'Game of Thrones');
        cy.get('.detail-poster').should(($poster) => {
            expect($poster.attr('src')).to.include('/w500/');
            expect($poster[0].getBoundingClientRect().width).to.be.greaterThan(310);
            expect(getComputedStyle($poster[0]).filter).to.not.equal('none');
        });
    });

    it('follows search query changes from browser history and rejects unmatched queries', () => {
        cy.visit(Cypress.expose('APP_SEARCH_URL'));
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
