import { CONSTS } from "../CONSTS.ts";
import AuthApi from "../api/auth/auth.ts";
import {SignInRequest, SignUpRequest} from "../api/type.ts";

const authApi = new AuthApi();

export const signIn = async (model: SignInRequest) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.signin(model);
        window.router.go(CONSTS.messenger);
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ signInError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ signInError: errorResponse.reason });
        } else {
            window.store.set({ signInError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const signUp = async (model: SignUpRequest) => {
    window.store.set({ isLoading: true });
    try {
        await authApi.signup(model);
        window.router.go(CONSTS.messenger);
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ signUpError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ signUpError: errorResponse.reason });
        } else {
            window.store.set({ signUpError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};

export const checkLoginUser = async () => {
    try {
        const response = await authApi.me();
        if (typeof response === 'object' && response !== null && 'response' in response) {
            const userResponse = await JSON.parse((response as any).response);
            window.store.set({ user: userResponse });
        } else {
            window.store.set({ user: response });
        }
        return true;
    } catch (res) {
        return false;
    }
};

export const logout = async () => {
    try {
        const response = await authApi.logout();
        if (typeof response === 'object' && response !== null && 'response' in response) {
            window.store.set({ user: null });
        } else {
            window.store.set({ user: null });
        }
        window.router.go(CONSTS.signIn);
    } catch (res) {
        console.log(res);
    }
};