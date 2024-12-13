import {MessageResponse} from "../api/type.ts";

export default function addMessage(messages: Array<MessageResponse>, newMessage: {}) {
    return [newMessage, ...messages];
}
