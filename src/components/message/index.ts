import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import {Avatar} from "../index.ts";

interface ChatInfoProps {
    name: string,
    avatar: string,
    message: string,
    time: string,
    me?: boolean,
}

export class Message extends Block {
    constructor(props: ChatInfoProps) {
        super({
            ...props,
            AvatarMessage: new Avatar({
                img: props.avatar,
            })
        });
    }
    render() {
        return `
            <div class="${styles.message} {{#if me}} ${styles.me} {{/if}}">
                <div class="${styles.avatar}">
                    {{{ AvatarMessage }}}
                </div>
                <div class="${styles.messages__item}">
                    <div class="${styles.messages__header}">
                        <div class="${styles.name}">
                            {{name}}
                        </div>
                        <div class="${styles.time}">
                            {{time}}
                        </div>
                    </div>
                    <div class="${styles.text}">
                        {{message}}
                    </div>
                </div>
            </div>
        `
    }
}
