import Route, { RouteInterface } from "./Route.ts";
import Block from "../core/Block.ts";

export type RouteBlock = new (...args: any[]) => Block;

class Router {

    public routes: RouteInterface[] = [];
    private static _instance: Router | null;
    private _currentRoute: any;
    private _rootQuery!: string | null;
    history;

    constructor(rootQuery: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router._instance = this;
    }

    use(pathname: string, block: RouteBlock) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.target as Window;
            this._onRoute(target.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            throw new Error(`Route ${pathname} не найден`);
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history!.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history!.back();
    }

    forward() {
        this.history!.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes.find(route => route.match(pathname));
        if(!route) {
            return this.routes.find(route => route.match('*'))
        }

        return route;
    }

}

export default Router;
