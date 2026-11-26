import formatReleaseDate from '../../src/utils/formatReleaseDate';

describe('formatReleaseDate', () => {
    it('formats date-only values without shifting their month', () => {
        expect(formatReleaseDate('2023-04-01')).toBe('April 2023');
        expect(formatReleaseDate(new Date('2023-04-01T00:00:00.000Z'))).toBe('April 2023');
    });
});
