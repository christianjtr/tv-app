import React, { useRef } from 'react';

export interface SearchProgramFormProps {
    onSearch: (criteria: string) => void;
    autoFocus?: boolean;
    isLoading?: boolean;
}

const SearchProgramForm: React.FC<SearchProgramFormProps> = (props: SearchProgramFormProps) => {
    const { onSearch: onSearchCallbackFn, autoFocus = false, isLoading = false } = props;

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
        <div className="card shrink-0 w-full shadow-2xl bg-neutral my-7 rounded">
            <form
                id="search_form"
                name="search_form"
                data-testid="search_form"
                className="card-body flex flex-row p-3"
                ref={searchFormRef}
                onSubmit={handleOnSubmitForm}
            >
                <div className="form-control flex-1">
                    <input
                        id="search_input"
                        name="search_input"
                        type="text"
                        placeholder="Search for a movie or tv show here..."
                        className="input input-bordered"
                        data-testid="search_input"
                        autoFocus={autoFocus}
                        disabled={isLoading}
                        autoComplete="off"
                        required
                        data-cy="search_input"
                    />
                </div>
                <div className="form-control flex">
                    <button
                        id="btn_search"
                        name="btn_search"
                        data-testid="btn_search"
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-ghost"
                        data-cy="btn_search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchProgramForm;
