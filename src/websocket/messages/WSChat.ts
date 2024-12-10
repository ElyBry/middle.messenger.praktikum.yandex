import {CONSTS} from "../../CONSTS.ts";
import {WebSocket} from "vite";
import CloseEvent = WebSocket.CloseEvent;

export default class WSChat {
    private _userId: number;
    private _chatId: number;
    private _tokenValue: string;
    private _socket: WebSocket;

    constructor(userId: number, chatId: number, tokenValue: string) {
        this._userId = userId;
        this._chatId = chatId;
        this._tokenValue = tokenValue;
        this._socket = new WebSocket(`${CONSTS.WS_URL}/${userId}/${chatId}/${tokenValue}`);

        this._addAllListeners();
    }

    private _addAllListeners() {
        this._addOpenListener();
        this._addCloseListener();
        this._addGetMessageListener();
        this._addGetErrorListener();
    }

    private _addOpenListener() {
        this._socket.addEventListener('open', () => {
            console.log("Соединение установлено");
        });
    }

    checkClean(event: CloseEvent) {
        return event.wasClean;
    }

    private _addCloseListener() {
        this._socket.addEventListener('close', event => {
            if (this.checkClean(event)) {
                console.log("Соединение закрыто");
            } else {
                console.log("Обрыв соединения, проверьте соединение с интернетом");
            }
            console.log("Код:", event.code, event.reason);
        });
    }

    private _addGetMessageListener() {
        this._socket.addEventListener('message', event => {
            console.log("Сообщение:", event.data);
        });
    }

    private _addGetErrorListener() {
        this._socket.addEventListener('error', event => {
            console.log("Ошибка", event.message);
        })
    }

    private _sendPing() {
        this._socket.send(JSON.stringify({
            type: "ping",
        }))
    }

    private _sendMessage(message: string) {
        this._socket.send(JSON.stringify({
            content: message,
            type: "message",
        }))
    }

    private _sendFile(filesUrl: string) {
        this._socket.send(JSON.stringify({
            content: filesUrl,
            type: "file",
        }))
    }

    private _sendSticker(sticker: string) {
        this._socket.send(JSON.stringify({
            content: sticker,
            type: "sticker",
        }))
    }

    private _getOldMessages() {
        this._socket.send(JSON.stringify({
            content: '20',
            type: 'get old',
        }))
    }

    private _changeSocketAdress(userId: number, chatId: number, tokenValue: string) {
        this._userId = userId;
        this._chatId = chatId;
        this._tokenValue = tokenValue;
        this._socket = new WebSocket(`${CONSTS.WS_URL}/${userId}/${chatId}/${tokenValue}`);
    }
}