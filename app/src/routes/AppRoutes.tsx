import React, { lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home'));
const Detail = lazy(() => import('@pages/Detail/Detail'));
const Search = lazy(() => import('@pages/Search'));
const NotFound = lazy(() => import('@pages/NotFound'));

const AppRoutes: React.FC = (): React.ReactElement => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:id" element={<Detail />} />
            <Route path="/tv-shows/:id" element={<Detail />} />
            <Route path="*" element={<NotFound showBackToHome />} />
        </Routes>
    );
};

export default AppRoutes;
