import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { APP_BASE_PATH } from './configuration/app.config';
import AppRoutes from './routes/AppRoutes';
import { Header, Container, Loading } from './layout';

const App: React.FC = (): React.ReactElement => {
    return (
        <BrowserRouter basename={APP_BASE_PATH}>
            <Header />
            <Container>
                <React.Suspense fallback={<Loading />}>
                    <AppRoutes />
                </React.Suspense>
            </Container>
        </BrowserRouter>
    );
};

export default App;
