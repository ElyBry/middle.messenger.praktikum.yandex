import HTTPTransport from "../../HTTP/HTTPTransport";
import {
    APIErrorResponse,
    CreateChatRequest,
    CreateChatResponse,
    getChatsRequest, userAddRequest,
} from "../type";

const chatsApi = new HTTPTransport("/chats");

export default class ChatsApi {
    async getChats(data: getChatsRequest): Promise< | APIErrorResponse | unknown> {
        return chatsApi.get("", data );
    }

    async createChat(data: CreateChatRequest): Promise< CreateChatResponse | APIErrorResponse | unknown> {
        return chatsApi.post("", { data } );
    }
    async deleteChats(data: string) {
        return chatsApi.delete("", { data });
    }
    async getTokenChat(data: number) {
        return chatsApi.post(`/token/${data}`);
    }
    async addUser(data: userAddRequest) {
        return chatsApi.put('/users', { data });
    }
    async removeUser(data: userAddRequest) {
        return chatsApi.delete(`/users`, { data });
    }
    async getUsersChat(data: number) {
        return chatsApi.get(`/${data}/users`);
    }
};
