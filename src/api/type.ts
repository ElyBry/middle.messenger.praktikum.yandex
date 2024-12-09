export type APIErrorResponse = {
    reason: string;
};

export type SignUpResponse = {
    id: number
};

export type SignUpRequest = Omit<UserDTOResponse, 'avatar' | 'display_name' | 'id'>  & {
    password: string
};

export type SignInRequest = {
    login: string,
    password: string
};

export type UserDTOResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

export type UserDTORequest = Omit<UserDTOResponse, 'id' | 'avatar'>;

export type ChangePasswordRequest = {
    password: string,
    password_confirm: string,
}

export type getChatsRequest = {
    offset: number;
    limit: number;
    title?: string;
}
export type getChatsResponse = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserDTOResponse,
        time: string,
        content: string,
    },
}

export type CreateChatRequest = {
    title: string
};

export type CreateChatResponse = {
    id: number,
}

type LastMessageRequest = {
    user: UserDTOResponse,
    time: string,
    content: string
}

export type ChatDTOResponse = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessageRequest | null
}