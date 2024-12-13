import HTTPTransport from "../../HTTP/HTTPTransport";
import {
    APIErrorResponse,
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

    async changeAvatar(data: File): Promise<UserDTOResponse | APIErrorResponse | unknown> {
        const formData = new FormData();
        formData.append("avatar", data);
        return usersApi.put("/profile/avatar", { data: formData });
    }

    async changePassword(data: ChangePasswordRequest): Promise<APIErrorResponse | unknown> {
        return usersApi.put("/password", { data });
    }

    async search(data: SearchResponse) {
        return usersApi.post("/search", { data });
    }
}
