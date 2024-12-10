import {CreateChatRequest, getChatsRequest, userAddRequest} from "../api/type.ts";
import ChatsApi from "../api/chats/chat.ts";
import {CONSTS} from "../CONSTS.ts";
import AsyncOperationHandler from "../api/base.ts";

const chatsApi = new ChatsApi();

export const getChats = async (model: getChatsRequest) => {
    const handler = new AsyncOperationHandler('getChatError');
    const chats = await handler.execute(async () => {
        return await chatsApi.getChats(model);
    });
    window.store.set({ chats });
};

export const createChats = async (model: CreateChatRequest) => {
    const handler = new AsyncOperationHandler('addChatError');
    await handler.execute(async () => {
        await chatsApi.createChat(model);
        getChats({
            offset: CONSTS.offset as number,
            limit: CONSTS.limit as number,
        });
    })
};

export const getTokenChat = async (model: number) => {
    const handler = new AsyncOperationHandler('getTokenChatError');
    await handler.execute(async () => {
        const result = await chatsApi.getTokenChat(model);
        if (typeof result === 'object' && result !== null && 'response' in result) {
            const token = await JSON.parse((result as any).response);
            window.store.set({ tokenChat: token.token });
        } else {
            console.log("Произошла непредвиденная ошибка");
        }
    })
};

export const addUser = async (model: userAddRequest) => {
    const handler = new AsyncOperationHandler('addUserError');
    await handler.execute(async () => {
        const result = await chatsApi.addUser(model);
        if (typeof result === 'object' && result !== null && 'response' in result) {
            getChats({
                offset: CONSTS.offset as number,
                limit: CONSTS.limit as number,
            });
        } else {
            console.log("Произошла непредвиденная ошибка");
        }
    })
};
