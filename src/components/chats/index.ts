import styles from './chats.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {connect} from "../../utils/Connect.ts";

export interface ChatProps {
    id: number,
    avatar?: string,
    title?: string,
    last_message?: string,
    created_by: number,
    unread_count?: number,
    openChatId?: number,
    openChat?: boolean,
    onClick?: (event: FocusEvent) => void,
}

class Chats extends Block {
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
                            {{title}}
                        </div>
                        <div class="${styles.message} {{#if isTyping}} typing {{/if}}">
                            {{last_message}}
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
interface StateInterface {
    isLoading: boolean;
    chats: string;
    addChatError: string;
}
const mapStateToProps = (state: StateInterface) => {
    return {
        isLoading: state.isLoading,
        chats: state.chats,
        addChatError: state.addChatError,
    }
}

export default connect(mapStateToProps)(Chats as unknown as new (props: Props) => Block<Props>);
