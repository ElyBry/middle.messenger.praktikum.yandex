import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import Avatar from "../avatar";
import {ChatDTOResponse} from "../../api/type.ts";
import formatTime from "../../utils/time.ts";

export interface ChatProps extends ChatDTOResponse {
    openChatId?: number,
    openChat?: boolean,
    onClick?: () => void,
}

class Chats extends Block {
    constructor(props: ChatProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
            AvatarBlock: new Avatar({
                img: props.avatar || '',
            })
        });
    }

    render() {
        const last_message = this.props.last_message?.user?.display_name ? this.props.last_message?.user?.display_name + " : " + this.props.last_message?.content : '';
        const time = this.props.last_message?.time ? formatTime(this.props.last_message?.time, true) : '';
        return `
            <div class="${styles.chats} {{#if active}} ${styles.active} {{/if}}">
                <div class="${styles.leftSide}">
                    <div class="${styles.avatar}">
                        {{#isEqual isOnline true}}
                            <div class="${styles.online}"></div>
                        {{else}}
                            <div class="${styles.offline}"></div>
                        {{/isEqual}}
                        {{{ AvatarBlock }}}
                    </div>
                    <div class="${styles.name_and_message}">
                        <div class="${styles.name}">
                            {{ title }}
                        </div>
                        <div class="${styles.message} {{#if isTyping}} typing {{/if}}">
                            ${last_message}
                        </div>
                    </div>
                </div>
                
                <div class="${styles.time}">
                    ${time}
                </div>
            </div>
        `
    }
}

export default Chats;
