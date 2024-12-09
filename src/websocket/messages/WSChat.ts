
export default class WSChat {
    private _userId: number;
    private _chatId: number;
    private _tokenValue: string;
    constructor(userId: number, chatId: number, tokenValue: string) {
        this._userId = userId;
        this._chatId = chatId;
        this._tokenValue = tokenValue;

        this._addConnect();
    }

    private _addConnect() {
        socket.addEventListener('connect', () => {

        });
    }
}