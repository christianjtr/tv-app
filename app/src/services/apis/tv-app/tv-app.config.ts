export interface tvAppApiInterface {
    config: {
        baseURL: string;
        isAPIMocked: boolean;
    };
}

export const tvAppApi: tvAppApiInterface = {
    config: {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        isAPIMocked: import.meta.env.VITE_ENABLE_API_MOCK === 'true',
    },
};
