enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method?: string,
    data?: any;
    headers?: any;
    timeout?: number;
    tries?: number;
};

const queryStringify = (data: Record<string, any>): string => {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    patch = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PATCH}, options.timeout);
    };
    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    private fetchWithRetry = (url: string, options: Options = {}): Promise<Response> => {
        const { tries = 1 } = options;

        const onError = (err: Error) => {
            const triesLeft = tries - 1;
            if (!triesLeft) {
                throw err;
            }

            return this.fetchWithRetry(url, {...options, tries: triesLeft});
        };

        return fetch(url, options).catch(onError);
    };

    request = (url: string, options: Options = {}, timeout = 5000) => {
        const {method, data, headers = {}} = options;

        return new Promise((resolve, reject): Promise<XMLHttpRequest> | undefined => {
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            }

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        }).catch(() => this.fetchWithRetry(url, options));
    };
}

export default HTTPTransport;
