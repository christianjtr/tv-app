import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = (): React.ReactElement => {
    const { pathname } = useLocation();
    const focusFirstRailItem = (railId: string): void => {
        requestAnimationFrame(() => document.getElementById(railId)?.querySelector<HTMLElement>('[data-element="tv-program-rail-item"]')?.focus());
    };

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="site-brand">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="7" width="18" height="13" rx="2" />
                        <path d="m8 3 4 4 4-4" />
                    </svg>
                    <span>TV app</span>
                </div>
                <nav className="site-navigation" aria-label="Main navigation">
                    <NavLink id="btn_home" data-testid="btn_home" to="/" end className="site-navigation__link">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
                        </svg>
                        <span>Home</span>
                    </NavLink>
                    {pathname === '/' && (
                        <>
                            <button
                                type="button"
                                className="site-navigation__link site-navigation__section-link"
                                data-testid="btn_movies"
                                onClick={() => focusFirstRailItem('movies')}
                            >
                                Movies
                            </button>
                            <button
                                type="button"
                                className="site-navigation__link site-navigation__section-link"
                                data-testid="btn_tv_shows"
                                onClick={() => focusFirstRailItem('tv-shows')}
                            >
                                TV Shows
                            </button>
                        </>
                    )}
                    <NavLink id="btn_search" data-testid="btn_search" to="/search" className="site-navigation__link">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="10.8" cy="10.8" r="6.8" />
                            <path d="m16 16 5 5" />
                        </svg>
                        <span>Search</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
