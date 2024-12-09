import UsersApi from "../api/users/users.ts";
import {UserDTORequest} from "../api/type.ts";

const authApi = new UsersApi();

export const changeProfile = async (model: UserDTORequest) => {
    window.store.set({ isLoading: true });
    try {
        const result = await authApi.changeProfile(model);
        if (typeof result === 'object' && result !== null && 'response' in result) {
            const user = await JSON.parse((result as any).response);
            window.store.set({ user: user });
        } else {
            window.store.set({ changeProfileError: "Произошла непредвиденная ошибка" });
        }
    } catch (error) {
        if (error instanceof Error && error.message) {
            window.store.set({ changeProfileError: error.message });
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
            const errorResponse = await JSON.parse((error as any).response);
            window.store.set({ changeProfileError: errorResponse.reason });
        } else {
            window.store.set({ changeProfileError: "Произошла непредвиденная ошибка" });
        }
    } finally {
        window.store.set({ isLoading: false });
    }
};