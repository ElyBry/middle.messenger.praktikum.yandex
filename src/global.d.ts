import Router from "./routing/Router.ts";
import Store from "./store/Store.ts";
import WSChat from "./websocket/messages/WSChat.ts";

declare global {
    interface Window {
        router: Router
        store: Store
        wsChat: WSChat
    }
}
