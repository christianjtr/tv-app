import React, { useRef } from 'react';

export interface SearchProgramFormProps {
    onSearch: (criteria: string) => void;
    isLoading?: boolean;
}

const SearchProgramForm: React.FC<SearchProgramFormProps> = (props: SearchProgramFormProps) => {
    const { onSearch: onSearchCallbackFn, isLoading = false } = props;

    const searchFormRef = useRef<HTMLFormElement | null>(null);

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const searchCriteria = formData.get('search_input') as string;

        onSearchCallbackFn(searchCriteria);
        resetForm();
    };

    const resetForm = (): void => {
        searchFormRef.current?.reset();
    };

    return (
        <div className="search-form-shell">
            <form
                id="search_form"
                name="search_form"
                data-testid="search_form"
                className="search-form"
                ref={searchFormRef}
                onSubmit={handleOnSubmitForm}
            >
                <label className="sr-only" htmlFor="search_input">
                    Search movies and TV shows
                </label>
                <div className="search-form__field">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="10.8" cy="10.8" r="6.8" />
                        <path d="m16 16 5 5" />
                    </svg>
                    <input
                        id="search_input"
                        name="search_input"
                        type="text"
                        placeholder="Search by title"
                        className="search-form__input"
                        data-testid="search_input"
                        disabled={isLoading}
                        autoComplete="off"
                        required
                        data-cy="search_input"
                    />
                </div>
                <button
                    id="search_submit"
                    name="search_submit"
                    data-testid="search_submit"
                    type="submit"
                    disabled={isLoading}
                    className="search-form__submit"
                    data-cy="btn_search"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchProgramForm;
