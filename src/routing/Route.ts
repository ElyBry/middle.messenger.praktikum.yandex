import Block, { Props } from '../core/Block.ts';

export interface RouteInterface {
    render: () => void;
    match: (path: string) => boolean;
    leave: () => void;
}
export type pathnameType = string;

export default class Route implements RouteInterface {
    private _pathname: pathnameType;
    private _blockClass: any;
    private _block: Block | null;
    private _props: Props;

    constructor(pathname: pathnameType, view: any, props: Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    leave() {
        if (this._block) {
            this._block.componentDidUnmount();
        }
    }

    _renderDom(query: string, block: Block) {
        const root = document.querySelector(query) as HTMLElement;
        root.innerHTML = "";
        root?.append(block.getContent() || "");
    }

    match(pathname: pathnameType) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
        }


        this._renderDom(this._props.rootQuery, this._block as Block);
        this._block?.componentDidMount();
    }
}
