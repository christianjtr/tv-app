import 'express';

declare global {
    namespace Express {
        interface Request {
            safeFields: Record<PropertyKey, unknown>;
        }
    }
}
