import {CONSTS} from "../../CONSTS.ts";
import addMessage from "../../utils/addMessage.ts";

export default class WSChat {
    private _userId: number;
    private _chatId: number;
    private _tokenValue: string;
    private _socket: WebSocket;
    private _listeners: { [key: string]: any} = {};

    constructor(userId: number, chatId: number, tokenValue: string) {
        this._userId = userId;
        this._chatId = chatId;
        this._tokenValue = tokenValue;
        this._socket = new WebSocket(`${CONSTS.WS_URL}${userId}/${chatId}/${tokenValue}`);

        this._addAllListeners();
    }

    private _addAllListeners() {
        this._addOpenListener();
        this._addCloseListener();
        this._addGetMessageListener();
        this._addGetErrorListener();
    }

    private _addOpenListener() {
        const listener = () => {
            console.log("Соединение установлено");
            this.getOldMessages();
        };
        this._socket.addEventListener('open', listener);
        this._listeners['open'] = listener;
    }

    checkClean(event: CloseEvent) {
        return event.wasClean;
    }

    private _addCloseListener() {
        const listener: (event: CloseEvent) => void = (event: CloseEvent) => {
            if (this.checkClean(event)) {
                console.log("Соединение закрыто");
            } else {
                console.log("Обрыв соединения, проверьте соединение с интернетом");
            }
            console.log("Код:", event.code, event.reason);
            this.clean();
            this._removeAllListeners();
            this._reconnect();
        };
        this._socket.addEventListener('close', listener);
        this._listeners['close'] = listener;
    }

    private _reconnect() {
        const RECONNECT_INTERVAL = 3000;
        console.log("Попытка переподключения");

        setTimeout(() => {
            this._socket = new WebSocket(`${CONSTS.WS_URL}${this._userId}/${this._chatId}/${this._tokenValue}`);
            this._addCloseListener();
            this._socket.addEventListener('open', () => {
                console.log("Соединение восстановлено");
            })
        }, RECONNECT_INTERVAL);
    }

    private _addGetMessageListener() {
        const listener = (event: MessageEvent) => {
            console.log("Сообщение:", event.data);
            const existingMessage = window.store.getState().messages;
            const newMessage = JSON.parse(event.data);
            if (existingMessage) {
                console.log(existingMessage, newMessage);
                const combo = addMessage(existingMessage, newMessage);
                console.log(combo);
                window.store.set({messages: combo});
            } else {
                window.store.set({messages: newMessage});
            }
        };
        this._socket.addEventListener('message', listener);
        this._listeners['message'] = listener;
    }

    private _addGetErrorListener() {
        const listener = (event: Event) => {
            console.log("Ошибка", event);
        };
        this._socket.addEventListener('error', listener);
        this._listeners['error'] = listener;
    }

    private _removeAllListeners() {
        for (const [eventType, listener] of Object.entries(this._listeners)) {
            this._socket.removeEventListener(eventType, listener);
        }
        this._listeners = {};
    }

    sendMessage(message: string) {
        this._socket.send(JSON.stringify({
            content: message,
            type: "message",
        }))
    }

    getOldMessages() {
        this._socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }))
    }

    clean() {
        this._removeAllListeners();
    }

    changeSocketAddress(userId: number, chatId: number, tokenValue: string) {
        this.clean();
        window.store.set({messages: undefined});
        this._userId = userId;
        this._chatId = chatId;
        this._tokenValue = tokenValue;
        this._socket = new WebSocket(`${CONSTS.WS_URL}${userId}/${chatId}/${tokenValue}`);
        this._addAllListeners();
        this.getOldMessages();
    }

    sendPing() {
        this._socket.send(JSON.stringify({
            type: "ping",
        }))
    }

    sendFile(filesUrl: string) {
        this._socket.send(JSON.stringify({
            content: filesUrl,
            type: "file",
        }))
    }

    sendSticker(sticker: string) {
        this._socket.send(JSON.stringify({
            content: sticker,
            type: "sticker",
        }))
    }
}
