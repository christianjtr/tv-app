import 'dotenv/config';
import app from './app';

const port = process.env.PORT || process.env.SERVER_PORT;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.info(`[Info]: API app listening on port ${port}`);
    });
}

export default app;
