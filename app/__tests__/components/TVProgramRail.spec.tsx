import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Movies from '../../__fixtures__/movies.json';
import { TVProgram } from '../../src/types/TVProgram';
import TVProgramRail from '../../src/components/TVProgramRail';

const mockHistoryPush = jest.fn();

jest.mock('../../src/services/apis/tv-app/tv-app.config.ts', () => ({
    tvAppApi: {
        config: {
            baseURL: '/base_url',
            isAPIMocked: true,
        },
    },
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

// COMMENT: Just an example on how to test a component within the client-side app...

describe('TVProgramRail component', () => {
    let movieCollection: TVProgram[];

    beforeAll(() => {
        movieCollection = Movies.results as unknown as TVProgram[];
    });

    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render the component correctly', () => {
        const component = renderer.create(<TVProgramRail title="dummy-movies" tvPrograms={movieCollection} tvProgramType="movie" />);
        expect(component).toBeDefined();
    });

    it('should render the skeleton if @isLoading prop is set to  === true', () => {
        const component = render(<TVProgramRail title="dummy-movies" tvPrograms={movieCollection} tvProgramType="movie" isLoading />);

        expect(component.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('should render the NotFound component if no items have provided', () => {
        const component = render(<TVProgramRail title="dummy-movies" tvPrograms={[]} tvProgramType="movie" />);

        expect(component.queryByTestId('not-found-component')).toBeInTheDocument();
    });

    it('should render the N elements within the rail', () => {
        const component = render(<TVProgramRail title="dummy-movies" tvPrograms={movieCollection} tvProgramType="movie" />);

        expect(component.queryByTestId('skeleton')).not.toBeInTheDocument();
        expect(component.queryByTestId('not-found-component')).not.toBeInTheDocument();
        expect(screen.getByText('dummy-movies')).toBeInTheDocument();
        expect(component.container.querySelectorAll('[data-element="tv-program-rail-item"]').length).toBe(movieCollection.length);
    });

    it('should perform operation when clicked on one item whithin a rail - navigate to /{tv-program-type}/{id}', () => {
        const [{ title, name, id }] = movieCollection;

        render(<TVProgramRail title="dummy-movies" tvPrograms={movieCollection} tvProgramType="movie" />);

        const tvProgramTitle = title || name;
        const tvProgramItemComponent = screen.getByTestId(`program_${tvProgramTitle}`);

        expect(tvProgramItemComponent).toBeTruthy();

        fireEvent.click(tvProgramItemComponent as HTMLElement);

        expect(mockHistoryPush).toHaveBeenCalledWith(`/movies/${id}`);
    });
});
