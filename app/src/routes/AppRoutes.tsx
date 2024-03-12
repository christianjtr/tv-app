import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { APP_BASE_PATH } from '@config/app.config';

const Home = lazy(() => import('@pages/Home'));
const Detail = lazy(() => import('@pages/Detail/Detail'));
const Search = lazy(() => import('@pages/Search'));
const NotFound = lazy(() => import('@pages/NotFound'));

const AppRoutes: React.FC = (): React.ReactElement => {
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
