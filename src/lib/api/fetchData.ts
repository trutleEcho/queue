// lib/fetchData.ts

export class FetchError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
    }
}

export const fetchData = async <T>(
    url: string,
    init?: RequestInit
): Promise<T> => {
    const res = await fetch(url, {
        method: init?.method || 'GET',
        headers: {
            'content-type': 'application/json',
            ...init?.headers,
        },
        body: init?.body,
    });

    if (res.status === 204) {
        // ✅ No content: return empty object or handle as needed
        // If T is expected to be an object, return {} as T
        return {} as T;
    }

    const contentType = res.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!res.ok) {
        const errorData = isJson ? await res.json().catch(() => null) : null;
        const message = errorData?.error || `API Error (${res.status})`;
        throw new FetchError(message, res.status);
    }

    if (isJson) {
        return res.json();
    }

    throw new FetchError('Unsupported response type', res.status);
};
