import queryStringify from "../utils/queryStringify.ts";
import {CONSTS} from "../CONSTS.ts";

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    title?: string,
    method?: string,
    data?: any;
    headers?: any;
    timeout?: number;
    tries?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

class HTTPTransport {
    private apiUrl = "";
    constructor(apiUrl: string) {
        this.apiUrl = `${CONSTS.apiUrl}${apiUrl}`;
    }
    get: HTTPMethod = (url, options = {}) => {
        return this._request(url, {...options, method: METHODS.GET}, options.timeout);
    };
    post: HTTPMethod = (url, options = {}) => {
        return this._request(url, {...options, method: METHODS.POST}, options.timeout);
    };
    put: HTTPMethod = (url, options = {}) => {
        return this._request(url, {...options, method: METHODS.PUT}, options.timeout);
    };
    patch: HTTPMethod = (url, options = {}) => {
        return this._request(url, {...options, method: METHODS.PATCH}, options.timeout);
    };
    delete: HTTPMethod = (url, options = {}) => {
        return this._request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    private _fetchWithRetry: HTTPMethod = (url, options = {}) => {
        const { tries = 1 } = options;

        const onError = (err: Error) => {
            const triesLeft = tries - 1;
            if (!triesLeft) {
                throw err;
            }

            return this._fetchWithRetry(url, {...options, tries: triesLeft});
        };

        return fetch(url, options).catch(onError);
    };

    private _request = async (url: string, options: Options = {}, timeout = 5000) => {
        url = `${this.apiUrl}${url}`;
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

            xhr.withCredentials = true;
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-type', 'application/json');
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } if (xhr.status >= 400 && xhr.status < 500) {
                    reject(xhr);
                } else {
                    reject(xhr);
                }
            }

            xhr.onabort = () => reject(xhr);
            xhr.onerror = () => reject(xhr);

            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(xhr);

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
