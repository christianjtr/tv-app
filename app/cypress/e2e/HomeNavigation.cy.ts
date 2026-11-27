import 'cypress-wait-until';

// COMMENT: Just an example on how to do a e2e test within the client-side app...

describe('Home view page navigation', () => {
    it('should visit home page', () => {
        cy.visit(Cypress.expose('APP_HOME_URL'));

        cy.get('.hero-slider').should(($hero) => {
            expect($hero[0].getBoundingClientRect().left).to.equal(0);
            expect($hero[0].getBoundingClientRect().width).to.equal(Cypress.config('viewportWidth'));
        });

        cy.get('[data-cy="hero-slide"]')
            .first()
            .within(() => {
                cy.get('[data-cy="hero-title"]')
                    .invoke('text')
                    .then((title) => cy.get('[data-cy="hero-image"]').should('have.attr', 'alt', `${title} backdrop`));
                cy.get('[data-cy="hero-description"]').should('not.exist');
            });
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
        cy.focused().should('have.attr', 'data-testid', 'btn_movies');
        cy.press('ArrowRight');
        cy.focused().should('have.attr', 'data-testid', 'btn_tv_shows');
        cy.press('ArrowRight');
        cy.focused().should('have.attr', 'data-testid', 'btn_search');
        cy.press('ArrowDown');
        cy.focused().should('have.attr', 'data-cy', 'tv-program-rail-item');

        cy.get(`${movieItems}:first-of-type`)
            .invoke('attr', 'aria-label')
            .then((firstMovieLabel) => {
                cy.get('[data-testid="btn_movies"]').click();
                cy.focused().should('have.attr', 'aria-label', firstMovieLabel);
            });

        cy.get(`${tvItems}:first-of-type`)
            .invoke('attr', 'aria-label')
            .then((firstTVLabel) => {
                cy.get('[data-testid="btn_tv_shows"]').click();
                cy.focused().should('have.attr', 'aria-label', firstTVLabel);
            });

        cy.get(`${movieItems}:nth-of-type(2)`)
            .invoke('attr', 'aria-label')
            .then((secondMovieLabel) => {
                cy.get(`${movieItems}:first-of-type`).focus();
                cy.press('ArrowRight');
                cy.focused().should('have.attr', 'aria-label', secondMovieLabel);
            });

        cy.get(movieItems).then(($movieCards) => {
            const movieLabels = $movieCards.toArray().map((card) => card.getAttribute('aria-label'));

            cy.get(tvItems).then(($tvCards) => {
                const tvLabels = $tvCards.toArray().map((card) => card.getAttribute('aria-label'));

                cy.get(`${movieItems}:first-of-type`).focus();
                cy.press('ArrowDown');
                cy.focused().should(($focused) => {
                    expect(tvLabels).to.include($focused.attr('aria-label'));
                });
                cy.press('ArrowUp');
                cy.focused().should(($focused) => {
                    expect(movieLabels).to.include($focused.attr('aria-label'));
                });
                cy.press('ArrowLeft');
                cy.focused().should(($focused) => {
                    expect(movieLabels).to.include($focused.attr('aria-label'));
                });
                cy.focused().click();
                cy.url().should('match', new RegExp(urlPattern));
            });
        });
    });

    it('loops focus within a poster rail', () => {
        const movieItems = '[data-element="tv-program-rail"]:first-of-type [data-cy="tv-program-rail-item"]';

        cy.visit(Cypress.expose('APP_HOME_URL'));
        cy.get('[data-cy="skeleton"]').should('not.exist');
        cy.get(`${movieItems}:first-of-type`)
            .invoke('attr', 'aria-label')
            .then((firstMovieLabel) => {
                cy.get(`${movieItems}:last-of-type`)
                    .invoke('attr', 'aria-label')
                    .then((lastMovieLabel) => {
                        cy.get(`${movieItems}:last-of-type`).focus();
                        cy.press('ArrowRight');
                        cy.focused().should(($card) => {
                            expect($card).to.have.attr('aria-label', firstMovieLabel);
                            const card = $card[0];
                            const viewport = card.closest('.program-rail__viewport') as HTMLElement;
                            const poster = card.querySelector('img') as HTMLImageElement;
                            const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft);
                            expect(card.getBoundingClientRect().left).to.be.closeTo(viewport.getBoundingClientRect().left + paddingLeft, 5);
                            expect(window.getComputedStyle(card).outlineStyle).to.equal('none');
                            expect(window.getComputedStyle(poster).filter).to.include('brightness');
                        });
                        cy.press('ArrowLeft');
                        cy.focused().should('have.attr', 'aria-label', lastMovieLabel);
                    });
            });
    });
});
