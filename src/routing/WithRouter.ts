import Block, {Props} from "../core/Block.ts";

export function withRouter<T extends Props>(WrappedBlock: new (props: T) => Block<T>) {
    return class extends WrappedBlock {
        constructor(props: T) {
            super({
                ...props,
                router: window.router,
            });
        }
    } as new (props: T) => Block<T>;
}
