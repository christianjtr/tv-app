interface ApiErrorResponse {
    error: { message: string };
}

const errorMessage = async (body: unknown, status: number): Promise<string> => {
    const { default: Joi } = await import('joi');
    const apiErrorSchema = Joi.object({
        error: Joi.object({ message: Joi.string().required() }).unknown(true).required(),
    }).unknown(true);
    const result = apiErrorSchema.validate(body, { convert: false });
    return result.error ? `Request failed (${status})` : (result.value as ApiErrorResponse).error.message;
};

export default async function requestJson<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await (signal ? fetch(url, { signal }) : fetch(url));
    const body: unknown = await response.json();

    if (!response.ok) throw new Error(await errorMessage(body, response.status));

    return body as T;
}
