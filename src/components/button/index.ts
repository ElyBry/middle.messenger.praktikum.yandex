import styles from './button.module.scss';
import Block from "../../core/Block.ts";

interface ButtonElementProps {
    label: string,
    type?: string,
    icon?: string,
    onClick?: (event: FocusEvent) => void,
    onHover?: {
        mouseover: (event: FocusEvent) => void,
        mouseout: (event: FocusEvent) => void,
    },
}

export class ButtonElement extends Block {
    constructor(props: ButtonElementProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
                ...(props.onHover ? {
                    mouseover: props.onHover.mouseover,
                    mouseout: props.onHover.mouseout,
                } : {})
            }
        });
    }
    render() {
        return `
            <button class="${styles.button}" type="{{type}}">
                {{label}}
                {{#if icon}}
                    <span class="material-symbols-outlined">{{icon}}</span>
                {{/if}}
            </button>
        `
    }
}
