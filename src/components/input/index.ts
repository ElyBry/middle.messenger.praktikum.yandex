import Block from "../../core/Block.ts";
import styles from './input.module.scss';
import { Input } from "./input.ts";
import { ErrorLine } from "./error.ts";

interface InputElementProps {
    onBlur?: (event: FocusEvent) => void;
    errorText?: string;
    name: string,
    label?: string,
    defValue?: string,
    type?: string,
    required?: boolean,
    min?: number,
    max?: number,
    onEnter?: (e: FocusEvent) => void,
}

class InputElement extends Block{
    constructor(props: InputElementProps) {
        super({
            ...props,
            Input: new Input({
                ...props,
                events: {
                    blur: props.onBlur || (() => {}),
                    keyDown: (e: KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            if (props.onEnter) {
                                this.props.onEnter(e);
                            }
                        }
                    }
                }
            }),
            ErrorLine: new ErrorLine({
                error: props.errorText,
            })
        });
    }

    componentDidUpdate(oldProps: InputElementProps, newProps: InputElementProps): boolean {
        if (oldProps === newProps) {
            return false;
        }
        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render() {
        return `
            <div class=${styles.input}>
                <label for="{{name}}">{{label}}</label>
                <div>
                    {{{ Input }}}
                    {{{ ErrorLine }}}
                </div>
            </div>
        `
    }
}
export { InputElement };