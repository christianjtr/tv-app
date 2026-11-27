import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Movies from '../../__fixtures__/movies.json';
import { TVProgram } from '../../src/types/TVProgram';
import TVProgramItem, { Rating } from '../../src/components/TVProgamItem/TVProgramItem';

// COMMENT: Just an example on how to test a component within the client-side app...

describe('TVProgramItem component', () => {
    let movieItem: TVProgram;
    const hasDecilmalPlaces = (rating: number) => rating - Math.floor(rating) !== 0;
    const formattedRating = (rating: number) => (hasDecilmalPlaces(rating) ? rating.toFixed(1) : Math.ceil(rating));

    beforeAll(() => {
        movieItem = Movies.results[0] as unknown as TVProgram;
    });

    afterEach(() => {
        cleanup();
    });

    it('keeps movie and series cards title-only on hover and focus', () => {
        const { title, name, description, rating, images } = movieItem;

        render(<TVProgramItem info={movieItem} onClick={() => undefined} />);

        const tvProgramTitle = title || name;
        const image = screen.getByRole('img');
        const card = screen.getByRole('button', { name: `View ${tvProgramTitle} details` });

        fireEvent.mouseEnter(card);
        fireEvent.focus(card);

        expect(screen.getByText(tvProgramTitle as string)).toBeInTheDocument();
        expect(screen.queryByText(description as string)).not.toBeInTheDocument();
        expect(screen.queryByText('January 2024')).not.toBeInTheDocument();
        expect(screen.queryByText(`${formattedRating(rating!)} ★` as string)).not.toBeInTheDocument();
        expect(image).toHaveAttribute('src', images?.w185);
        expect(image).toHaveAttribute('alt', `${tvProgramTitle} poster`);
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
