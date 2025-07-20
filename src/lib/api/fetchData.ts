// lib/fetchData.ts

export class FetchError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
    }
}

/**
 * A utility function to delay execution (used for retry backoff).
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic fetch utility with automatic retry and JSON handling.
 * @param url API endpoint
 * @param init RequestInit
 * @param retries Number of retry attempts (default: 3)
 * @param retryDelay Initial retry delay in ms (default: 1000ms)
 */
export const fetchData = async <T>(
    url: string,
    init?: RequestInit,
    retries = 3,
    retryDelay = 1000
): Promise<T> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, {
                method: init?.method || 'GET',
                headers: {
                    'content-type': 'application/json',
                    ...init?.headers,
                },
                body: init?.body,
            });

            if (res.status === 204) {
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
                return await res.json();
            }

            throw new FetchError('Unsupported response type', res.status);

        } catch (err) {
            const isLastAttempt = attempt === retries;
            if (isLastAttempt || !(err instanceof FetchError)) {
                throw err;
            }

            // Optional: Retry only on network errors or 5xx
            if (err.status >= 500 || err instanceof TypeError) {
                await delay(retryDelay * Math.pow(2, attempt)); // exponential backoff
            } else {
                throw err; // don't retry on 4xx
            }
        }
    }

    // This point should never be reached
    throw new FetchError('Failed after retries', 500);
};
