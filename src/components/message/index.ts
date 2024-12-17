import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import {Avatar} from "../index.ts";
import {MessageResponse} from "../../api/type.ts";
import formatTime from "../../utils/time.ts";

export default class Message extends Block {
    constructor(props: MessageResponse) {
        super({
            ...props,
            AvatarMessage: new Avatar({
                img: '',
            }),
            me: window.store.getState().user?.id === props.user_id,
            name: window.store.getState().user?.id === props.user_id ? window.store.getState().user?.display_name : props.user_id,
            time: formatTime(props.time, true),
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
                        {{content}}
                    </div>
                </div>
            </div>
        `
    }
}
