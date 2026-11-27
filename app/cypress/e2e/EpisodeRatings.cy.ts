describe('Episode ratings', () => {
    it('selects seasons to show larger episode ratings without nested scrolling', () => {
        cy.viewport(390, 844);
        cy.intercept('GET', '**/api/tv-shows/1399/seasons/*/episode-ratings').as('seasonRatings');
        cy.visit(`${Cypress.expose('APP_HOME_URL')}/tv-shows/1399`);

        cy.get('.episode-ratings__layout').should('be.visible');
        cy.get('#episode-ratings-title').should(($heading) => {
            const appWindow = $heading[0].ownerDocument.defaultView!;
            expect(appWindow.getComputedStyle($heading[0]).fontFamily).to.equal(
                appWindow.getComputedStyle($heading[0].ownerDocument.querySelector('.detail-title') as HTMLElement).fontFamily
            );
            expect(appWindow.getComputedStyle($heading[0]).color).to.equal('rgb(247, 168, 212)');
        });
        cy.contains('.episode-ratings__heading p', 'original air dates').should('be.visible');
        cy.get('.episode-ratings__season-list .season-card').should('have.length', 9);
        cy.get('.episode-ratings__season-list').should(($list) => {
            expect($list[0].scrollHeight).to.equal($list[0].clientHeight);
        });
        cy.get('.episode-ratings__season-list .season-card--selectable').should('have.length', 8);
        cy.get('.season-card--selected').should(($season) => {
            expect(getComputedStyle($season[0]).backgroundColor).not.to.equal('rgba(0, 0, 0, 0)');
        });
        cy.get('.season-card__poster')
            .first()
            .should(($poster) => {
                expect($poster[0].getBoundingClientRect().width).to.be.greaterThan(72);
            });
        cy.get('.episode-ratings__seasons, .episode-ratings__comparison').should(($sections) => {
            $sections.each((_, section) => {
                expect(getComputedStyle(section).borderTopWidth).to.equal('0px');
                expect(getComputedStyle(section).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
            });
        });
        cy.wait('@seasonRatings');
        cy.contains('.episode-ratings__comparison-heading h3', 'Season 1').should('be.visible');
        cy.contains('.episode-ratings__comparison-heading p', 'TMDB community scores').should('be.visible');
        cy.get('.episode-ratings__episode').should('have.length', 12);
        cy.get('.episode-ratings__episode').first().should('contain.text', 'Winter Is Coming').and('contain.text', '9.1');
        cy.get('.episode-ratings__episode time').first().should('have.attr', 'datetime', '2011-04-17');
        cy.get('.episode-ratings__score')
            .first()
            .should(($score) => {
                expect(Number.parseFloat(getComputedStyle($score[0]).fontSize)).to.be.greaterThan(24);
                expect(getComputedStyle($score[0]).backgroundColor).to.equal('rgba(172, 229, 183, 0.15)');
                expect(getComputedStyle($score[0]).color).to.equal('rgb(172, 229, 183)');
            });
        cy.get('.episode-ratings__episode-score').then(($scores) => {
            const columns = getComputedStyle($scores[0].closest('.episode-ratings__grid') as HTMLElement)
                .gridTemplateColumns.trim()
                .split(/\s+/).length;
            const items = $scores.toArray();
            for (let index = 0; index < items.length; index += columns) {
                const positions = items.slice(index, index + columns).map((score) => score.getBoundingClientRect().top);
                expect(Math.max(...positions) - Math.min(...positions)).to.be.lessThan(1);
            }
        });

        cy.contains('button.season-card--selectable', 'Season 2').click();
        cy.wait('@seasonRatings');
        cy.contains('button.season-card--selectable', 'Season 2').should('have.attr', 'aria-pressed', 'true');
        cy.contains('.episode-ratings__comparison-heading h3', 'Season 2').should('be.visible');
        cy.get('.episode-ratings__episode').should('have.length', 10);
        cy.get('.episode-ratings__episode').eq(0).should('contain.text', 'The North Remembers').and('contain.text', 'No votes');
        cy.get('.episode-ratings__episode').eq(1).should('contain.text', 'The Night Lands').and('contain.text', 'Upcoming');
        cy.get('.episode-ratings__episode').eq(2).should('contain.text', 'Episode 3').and('contain.text', 'Sin nota');

        cy.contains('button.season-card--selectable', 'Season 3').click();
        cy.wait('@seasonRatings');
        cy.contains('[role="status"]', 'Season 3 could not be loaded').should('be.visible');
        cy.get('.episode-ratings__episode').should('have.length', 10).and('contain.text', 'No disponible');

        cy.contains('button.season-card--selectable', 'Season 4').click();
        cy.wait('@seasonRatings');
        cy.get('.episode-ratings__episode').should('have.length', 10).and('contain.text', 'Sin nota');
        cy.get('@seasonRatings.all').should('have.length', 4);
        cy.get('.episode-ratings__grid').should(($grid) => {
            expect($grid[0].scrollHeight).to.equal($grid[0].clientHeight);
            expect($grid[0].scrollWidth).to.equal($grid[0].clientWidth);
        });
        cy.document()
            .its('documentElement')
            .should((documentElement) => {
                expect(documentElement.scrollWidth).to.be.at.most(documentElement.clientWidth);
            });

        cy.viewport(1280, 900);
        cy.contains('button.season-card--selectable', 'Season 1').click();
        cy.get('.episode-ratings__seasons').then(($seasons) => {
            cy.get('.episode-ratings__comparison').then(($grid) => {
                expect($seasons[0].getBoundingClientRect().top).to.be.closeTo($grid[0].getBoundingClientRect().top, 2);
                expect($seasons[0].getBoundingClientRect().right).to.be.lessThan($grid[0].getBoundingClientRect().left);
            });
        });
    });

    it('does not offer an episode grid for movies or series without seasons', () => {
        cy.visit(`${Cypress.expose('APP_HOME_URL')}/movies/550`);
        cy.get('h1').should('not.be.empty');
        cy.get('.episode-ratings').should('not.exist');

        cy.visit(`${Cypress.expose('APP_HOME_URL')}/tv-shows/999998`);
        cy.contains('0 seasons').should('be.visible');
        cy.get('.episode-ratings').should('not.exist');
    });
});
