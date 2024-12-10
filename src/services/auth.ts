import { CONSTS } from "../CONSTS.ts";
import AuthApi from "../api/auth/auth.ts";
import {SignInRequest, SignUpRequest} from "../api/type.ts";
import AsyncOperationHandler from "../api/base.ts";

const authApi = new AuthApi();

export const signIn = async (model: SignInRequest) => {
    const handler = new AsyncOperationHandler('signInError');
    await handler.execute(async () => {
        return await authApi.signin(model);
    });
    checkLoginUser();
    window.router.go(CONSTS.messenger);
};

export const signUp = async (model: SignUpRequest) => {
    const handler = new AsyncOperationHandler('signUpError');
    await handler.execute(async () => {
        return await authApi.signup(model);
    });
};

export const checkLoginUser = async () => {
    const handler = new AsyncOperationHandler();
    return await handler.execute(async () => {
        const response =  await authApi.me();

        if (typeof response === 'object' && response !== null) {
            const userResponse = JSON.parse((response as any).response);
            window.store.set({ user: userResponse });
            return true;
        }

    }).catch(() => {
        return false;
    });
};

export const logout = async () => {
    const handler = new AsyncOperationHandler();
    await handler.execute(async () => {
        await authApi.logout();
        window.store.set({ user: null });
        window.router.go(CONSTS.signIn);
        window.store.set({ 'signInError': '' });
    });
};