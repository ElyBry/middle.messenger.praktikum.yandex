import styles from './chats.module.scss';
import Block from "../../core/Block.ts";

interface ChatProps {
    id: number,
    isOnline: boolean,
    isTyping: boolean,
    avatar: string,
    name: string,
    lastMessage: string,
    time: string,
    active?: boolean,
    onClick?: (event: FocusEvent) => void,
}

export class Chats extends Block {
    constructor(props: ChatProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
        });
    }

    render() {
        return `
            <div class="${styles.chats} {{#if active}} ${styles.active} {{/if}}">
                <div class="${styles.leftSide}">
                    <div class="${styles.avatar}">
                        {{#isEqual isOnline true}}
                            <div class="${styles.online}"></div>
                        {{else}}
                            <div class="${styles.offline}"></div>
                        {{/isEqual}}
                        {{> Avatar img=avatar }}
                    </div>
                    <div class="${styles.name_and_message}">
                        <div class="${styles.name}">
                            {{name}}
                        </div>
                        <div class="${styles.message} {{#if isTyping}} typing {{/if}}">
                            {{lastMessage}}
                        </div>
                    </div>
                </div>
                
                <div class="${styles.time}">
                    {{time}}
                </div>
            </div>
        `
    }
}
