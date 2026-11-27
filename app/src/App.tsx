import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { APP_BASE_PATH } from './configuration/app.config';
import AppRoutes from './routes/AppRoutes';
import { Header, Container, Loading } from './layout';
import useArrowNavigation from '@hooks/useArrowNavigation';

const NAVIGATION_SELECTOR = '[tabindex], button, a[href], input, textarea, select';

const AppContent: React.FC = (): React.ReactElement => {
    const navigationRef = useArrowNavigation(NAVIGATION_SELECTOR);

    return (
        <div ref={navigationRef} data-cy="main_container">
            <Header />
            <main>
                <Container>
                    <React.Suspense fallback={<Loading />}>
                        <AppRoutes />
                    </React.Suspense>
                </Container>
            </main>
        </div>
    );
};

const App: React.FC = (): React.ReactElement => {
    return (
        <BrowserRouter basename={APP_BASE_PATH}>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
