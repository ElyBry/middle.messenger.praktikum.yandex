import HTTPTransport from "../../HTTP/HTTPTransport";
import {
    APIErrorResponse,
    SignInRequest,
    UserDTOResponse,
    ChangePasswordRequest,
    UserDTORequest,
} from "../type";

const usersApi = new HTTPTransport("/user");

export default class UsersApi {
    async changeProfile(data: UserDTORequest): Promise<UserDTOResponse | APIErrorResponse | unknown> {
        return usersApi.put("/profile", { data });
    }

    async changeAvatar(data: SignInRequest): Promise<UserDTOResponse | APIErrorResponse | unknown> {
        return usersApi.put("/profile/avatar", { data });
    }

    async changePassword(data: ChangePasswordRequest): Promise<APIErrorResponse | unknown> {
        return usersApi.put("/user", { data });
    }

    async search() {
        return usersApi.post("/logout");
    }
}