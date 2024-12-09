import Router from "./routing/Router.ts";
import Store from "./store/Store.ts";

declare global {
    interface Window {
        router: Router
        store: Store
    }
}
