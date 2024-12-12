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

export type SearchResponse = {
    login: string,
}

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

export type userAddRequest = {
    users: number[],
    chatId: number,
}

export type LastMessageUser = Omit<UserDTOResponse, 'id' | 'display_name' >

export type LastMessageResponse = {
    time: string,
    content: string,
    user: LastMessageUser,
}

export type LastMessageRequest = {
    id: number,
    created_by: number,
    avatar: string,
    last_message: LastMessageUser,
    title: string,
    unread_count: number,
}

export type MessageResponse = {
    chat_id: number
    content: string,
    file: null | object,
    id: number,
    is_read: boolean
    time: string,
    type: string,
    user_id: number,
}

export type ChatDTOResponse = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessageResponse | null
}