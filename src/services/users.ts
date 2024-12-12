import UsersApi from "../api/users/users.ts";
import {SearchResponse, UserDTORequest} from "../api/type.ts";
import AsyncOperationHandler from "../api/base.ts";

const authApi = new UsersApi();

export const changeProfile = async (model: UserDTORequest) => {
    const handler = new AsyncOperationHandler('changeProfileError');
    const user = await handler.execute(async () => {
        return await authApi.changeProfile(model);
    });
    window.store.set({ user });
};

export const getUsers = async (model: SearchResponse) => {
    const handler = new AsyncOperationHandler('changeProfileError');
    const searchUsers = await handler.execute(async () => {
        return await authApi.search(model);
    });
    console.log(searchUsers);
    window.store.set({ searchUsers });
};
