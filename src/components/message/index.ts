import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import {Avatar} from "../index.ts";

interface MessageProps {
    chat_id: number
    content: string,
    file: null | object,
    id: number,
    is_read: boolean
    time: string,
    type: string,
    user_id: number,
}

export default class Message extends Block {
    constructor(props: MessageProps) {
        super({
            ...props,
            AvatarMessage: new Avatar({
                img: '',
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
                            {{user_id}}
                        </div>
                        <div class="${styles.time}">
                            {{time}}
                        </div>
                    </div>
                    <div class="${styles.text}">
                        {{content}}
                    </div>
                </div>
            </div>
        `
    }
}
