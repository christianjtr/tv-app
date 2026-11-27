import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TVShowDetailed } from '@tv-app-packages/shared-types';
import SeasonCard from '../../src/components/SeasonCard';

const season: TVShowDetailed['seasons'][number] = {
    firstAirDate: '2011-04-17',
    numberOfEpisodes: 10,
    id: 1,
    name: 'Season 1',
    description: 'Season overview should not appear in the card.',
    seasonNumber: 1,
    rating: 8.3,
    images: {
        original: 'https://example.org/season-original.jpg',
        w185: 'https://example.org/season-poster-small.jpg',
        w300: 'https://example.org/season-poster.jpg',
        w500: 'https://example.org/season-poster-large.jpg',
    },
};

describe('SeasonCard', () => {
    it('shows the season title, premiere, episode count, and rating', () => {
        render(<SeasonCard info={season} />);

        expect(screen.getByRole('heading', { name: 'Season 1' })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Season 1 poster' })).toHaveAttribute('src', season.images.w300);
        expect(screen.getByText('April 2011')).toBeInTheDocument();
        expect(screen.getByText('10 episodes')).toBeInTheDocument();
        expect(screen.getByText('8.3 ★')).toBeInTheDocument();
        expect(screen.queryByText(season.description)).not.toBeInTheDocument();
    });

    it('keeps specials useful without an air date or rating', () => {
        const specials = { ...season, firstAirDate: '', name: 'Specials', numberOfEpisodes: 0, rating: 0 };
        render(<SeasonCard info={specials} />);

        expect(screen.getByRole('heading', { name: 'Specials' })).toBeInTheDocument();
        expect(screen.getByText('0 episodes')).toBeInTheDocument();
        expect(screen.queryByText('0 ★')).not.toBeInTheDocument();
        expect(screen.queryByText(/invalid date/i)).not.toBeInTheDocument();
    });
});
