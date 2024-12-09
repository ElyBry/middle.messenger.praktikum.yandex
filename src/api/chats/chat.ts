import HTTP from './../HTTP/HTTPTransport.ts';
import { BaseAPI } from './base.ts';

const http = new HTTP();

class ChatAPI extends BaseAPI {
    private _link = 'api/v1/chats';
    create() {
        return http.post(this._link + '/', {title: 'string'});
    }

    request() {
        return http.get(this._link + '/full');
    }
}

export default ChatAPI;