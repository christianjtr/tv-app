const formatReleaseDate = (value: Date | string): string => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

export default formatReleaseDate;
