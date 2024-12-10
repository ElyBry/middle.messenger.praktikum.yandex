import UsersApi from "../api/users/users.ts";
import {UserDTORequest} from "../api/type.ts";
import AsyncOperationHandler from "../api/base.ts";

const authApi = new UsersApi();

export const changeProfile = async (model: UserDTORequest) => {
    const handler = new AsyncOperationHandler('changeProfileError');
    const user = await handler.execute(async () => {
        return await authApi.changeProfile(model);
    });
    window.store.set({ user });
};