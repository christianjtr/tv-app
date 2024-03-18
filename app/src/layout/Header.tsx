import React from 'react';
import { useHistory } from 'react-router-dom';

const Header: React.FC = (): React.ReactElement => {
    const history = useHistory();

    const handleOnClickNavBtn = (path: string): void => {
        history.push(path);
    };

    return (
        <header>
            <div className="navbar bg-base-100 text-neutral-content p-4">
                <div className="navbar-start">
                    <button
                        id="btn_home"
                        name="btn_home"
                        data-testid="btn_home"
                        onClick={() => handleOnClickNavBtn('/')}
                        className="btn btn-ghost text-lg"
                    >
                        <svg
                            className="h-8 w-8 text-pink-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="3" y="7" width="18" height="13" rx="2" />
                            <polyline points="16 3 12 7 8 3" />
                        </svg>
                        TV app
                    </button>
                </div>
                <div className="navbar-end">
                    <button
                        id="btn_search"
                        name="btn_search"
                        data-testid="btn_search"
                        type="submit"
                        className="btn btn-ghost"
                        onClick={() => handleOnClickNavBtn('/search')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
