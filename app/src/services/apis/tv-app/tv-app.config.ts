export interface tvAppApiInterface {
    config: {
        baseURL: string;
    };
}

export const tvAppApi: tvAppApiInterface = {
    config: {
        baseURL: import.meta.env.VITE_API_BASE_URL,
    },
};
