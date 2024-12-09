import Router from "./src/routing/Router";

declare global {
    interface Window {
        router: Router
    }
}
