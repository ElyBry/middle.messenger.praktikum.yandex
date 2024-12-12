import HTTPTransport from "../../HTTP/HTTPTransport";
import {
    APIErrorResponse,
    SignInRequest,
    UserDTOResponse,
    ChangePasswordRequest,
    UserDTORequest,
    SearchResponse,
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

    async search(data: SearchResponse) {
        return usersApi.post("/search", { data });
    }

}