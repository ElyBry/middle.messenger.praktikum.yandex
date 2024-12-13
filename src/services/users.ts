import UsersApi from "../api/users/users.ts";
import {ChangePasswordRequest, SearchResponse, UserDTORequest} from "../api/type.ts";
import AsyncOperationHandler from "../api/base.ts";

const usersApi = new UsersApi();

export const changeProfile = async (model: UserDTORequest) => {
    const handler = new AsyncOperationHandler('changeProfileError');
    const user = await handler.execute(async () => {
        return await usersApi.changeProfile(model);
    });
    window.store.set({ user });
};

export const getUsers = async (model: SearchResponse) => {
    const handler = new AsyncOperationHandler('getUsersError');
    const searchUsers = await handler.execute(async () => {
        return await usersApi.search(model);
    });

    window.store.set({ searchUsers });
};

export const changeAvatar = async (model: File) => {
    const handler = new AsyncOperationHandler('changeAvatarError');
    const user = await handler.execute(async () => {
        return await usersApi.changeAvatar(model);
    });

    window.store.set({ user });
};

export const changePassword = async (model: ChangePasswordRequest) => {
    const handler = new AsyncOperationHandler('changePasswordError');
    await handler.execute(async () => {
        return await usersApi.changePassword(model);
    });
};
