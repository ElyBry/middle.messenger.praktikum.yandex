import HTTPTransport from "../../HTTP/HTTPTransport";
import {
    APIErrorResponse,
    SignUpRequest,
    SignInRequest,
    SignUpResponse,
    UserDTOResponse,
} from "../type";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
    async signup(data: SignUpRequest): Promise<SignUpResponse | APIErrorResponse | unknown> {
        return authApi.post("/signup", { data });
    }

    async signin(data: SignInRequest): Promise<UserDTOResponse | APIErrorResponse | unknown> {
        return authApi.post("/signin", { data });
    }

    async me() {
        return authApi.get("/user");
    }

    async logout() {
        return authApi.post("/logout");
    }
}