import Block from "../../core/Block.ts";
import styles from './input.module.scss';
import { Input } from "./input.ts";
import { ErrorLine } from "./error.ts";

interface InputElementProps {
    errorText?: string,
    name: string,
    label?: string,
    value?: string | number | boolean,
    defValue?: string,
    type?: string,
    required?: boolean,
    min?: number,
    max?: number,
    onEnter?: (e: FocusEvent) => void,
    onBlur?: (event: FocusEvent) => void;
    onChange?: (event: FocusEvent) => void;
}

class InputElement extends Block{
    constructor(props: InputElementProps) {
        super({
            ...props,
            Input: new Input({
                ...props,
                events: {
                    blur: props.onBlur || (() => {}),
                    keydown: (e: KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            if (props.onEnter) {
                                this.props.onEnter(e);
                            }
                        }
                    },
                    input: props.onChange,
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
        this.setPropsForChildren(this.children.ErrorLine, newProps);
        return true;
    }

    // public value() {
    //     return this.children.Input.getContent().value;
    // }

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
