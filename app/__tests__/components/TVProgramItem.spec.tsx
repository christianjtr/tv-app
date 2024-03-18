import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Movies from '../../__fixtures__/movies.json';
import { TVProgram } from '../../src/types/TVProgram';
import TVProgramItem, { Rating } from '../../src/components/TVProgamItem/TVProgramItem';

// COMMENT: Just an example on how to test a component within the client-side app...

describe('TVProgramItem component', () => {
    let movieItem: TVProgram;
    // Consider import this from a utils...
    const formattedDate = (releaseDate: string) => new Date(releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const hasDecilmalPlaces = (rating: number) => rating - Math.floor(rating) !== 0;
    const formattedRating = (rating: number) => (hasDecilmalPlaces(rating) ? rating.toFixed(1) : Math.ceil(rating));

    beforeAll(() => {
        movieItem = Movies.results[0] as unknown as TVProgram;
    });

    afterEach(() => {
        cleanup();
    });

    it('should render the component correctly', () => {
        const component = renderer.create(<TVProgramItem info={movieItem} onClick={() => {}} />);
        expect(component).toBeDefined();
    });

    it('should render the correct info', () => {
        const { title, name, description, releaseDate, rating, images } = movieItem;

        render(<TVProgramItem info={movieItem} onClick={() => {}} />);

        const tvProgramTitle = title || name;
        const image = screen.getByRole('img');

        expect(screen.getByText(tvProgramTitle as string)).toBeInTheDocument();
        expect(screen.getByText(description as string)).toBeInTheDocument();
        expect(screen.getByText(formattedDate(releaseDate as unknown as string) as string)).toBeInTheDocument();
        expect(screen.getByText(`${formattedRating(rating!)} ★` as string)).toBeInTheDocument();
        expect(image).toHaveAttribute('src', images?.w185);
        expect(image).toHaveAttribute('alt', `${tvProgramTitle} poster`);
        expect(image).toHaveAttribute('aria-label', `${tvProgramTitle} poster`);
    });

    it('should perform operation when clicked on', () => {
        const callbackFunction = jest.fn();

        render(<TVProgramItem info={movieItem} onClick={callbackFunction} />);

        const { title, name } = movieItem;
        const tvProgramTitle = title || name;

        const tvProgramItem = screen.getByTestId(`program_${tvProgramTitle}`);

        fireEvent.click(tvProgramItem);

        expect(callbackFunction).toHaveBeenCalledTimes(1);
    });
});

describe('TVProgramItem > Rating component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render the component correctly', () => {
        const component = render(<Rating value={10} />);

        expect(component).toBeDefined();
        expect(screen.getByText('10 ★')).toBeInTheDocument();
    });

    it('should render the optional props if provided', () => {
        const styleClass = 'dummy-class-name';

        const component = render(<Rating value={10.123456} precision={3} className={styleClass} />);

        expect(screen.getByText('10.123 ★')).toBeInTheDocument();
        expect(component.container.firstChild).toHaveClass(styleClass);
    });
});
