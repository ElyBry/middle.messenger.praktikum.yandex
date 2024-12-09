import { StoreEvents } from "../store/Store.ts";
import isEqual from "./isEqual.ts";
import Block, {Props} from "../core/Block.ts";

export function connect<T extends Props>(mapStateToProps: (state: any) => T) {
    return function (Component: new (props: Props) => Block<Props>) {
        return class extends Component {
            private onChangeStoreCallback: () => void;
            constructor(props: Props) {
                const store = window.store;
                let state = mapStateToProps(store.getState());

                super({
                    ...props,
                    ...state
                });

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                };

                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentDidUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}