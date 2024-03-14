import React, { lazy, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { APP_BASE_PATH } from '@configuration/app.config';

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
        <Switch>
            <Redirect exact from={APP_BASE_PATH} to="/" />
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path={['/movies/:id', '/tv-shows/:id']} component={Detail} />
            <Route path="*">
                <NotFound showBackToHome />
            </Route>
        </Switch>
    );
};

export default AppRoutes;
