import {CreateChatRequest, getChatsRequest} from "../api/type.ts";
import ChatsApi from "../api/chats/chat.ts";
import {CONSTS} from "../CONSTS.ts";

const chatsApi = new ChatsApi();

export const getChats = async (model: getChatsRequest) => {
    window.store.set({ isLoading: true });
    try {
        const result = await chatsApi.getChats(model);
        if (typeof result === 'object' && result !== null && 'response' in result) {
            const chats = await JSON.parse((result as any).response);
            window.store.set({ chats });
        } else {
            console.log("Произошла непредвиденная ошибка");
        }
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ getChatError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ getChatError: errorResponse.reason });
        } else {
            window.store.set({ getChatError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const createChats = async (model: CreateChatRequest) => {
    window.store.set({ isLoading: true });
    try {
        await chatsApi.createChat(model);
        getChats({
            offset: CONSTS.offset as number,
            limit: CONSTS.limit as number,
        });
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ addChatError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ addChatError: errorResponse.reason });
        } else {
            window.store.set({ addChatError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const getTokenChat = async (model: number) => {
    window.store.set({ isLoading: true });
    try {
        const result = await chatsApi.getTokenChat(model);
        if (typeof result === 'object' && result !== null && 'response' in result) {
            const token = await JSON.parse((result as any).response);
            window.store.set({ tokenChat: token.token });
        } else {
            console.log("Произошла непредвиденная ошибка");
        }
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ getTokenChatError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ getTokenChatError: errorResponse.reason });
        } else {
            window.store.set({ getTokenChatError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};