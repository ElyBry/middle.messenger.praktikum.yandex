import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {InputElement} from "../input";
import {ButtonElement} from "../button";

import {connect} from "../../utils/Connect.ts";
import * as chatsService from "../../services/chats.ts";

interface AddChatProps {
    openAddChat: boolean,
}

class AddChat extends Block{
    constructor(props: AddChatProps) {
        super({
            ...props,
            openAddChat: props.openAddChat,
        });
    }
    init() {
        const onCloseAddChatBind = this.onCloseAddChat.bind(this);
        const onInputNameChatBind = this.onInputNameChat.bind(this);
        const onClickButtonAddChatBind = this.onClickButtonAddChat.bind(this);

        const ButtonAddChat = new ButtonElement({
            label: "Добавить",
            type: "submit",
            icon: "save",
            onClick: onClickButtonAddChatBind
        })
        const ButtonCloseAddChat = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCloseAddChatBind,
        });
        const InputNameChat = new InputElement({
            name: "search",
            type: "text",
            onBlur: onInputNameChatBind,
        });
        this.children = {
            ...this.children,
            ButtonCloseAddChat,
            InputNameChat,
            ButtonAddChat,
        }
    }

    onClickButtonAddChat(e: Event) {
        e.preventDefault();
        const data = {
            title: this.props.chatName,
        }

        chatsService.createChats(data);
    }

    onInputNameChat(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({chatName: value});
    }

    onCloseAddChat() {
        this.setProps({openAddChat: false});
    }

    render() {
        return `
            <div class="${styles.module}">
                <form class="${styles.inputModule}">
                    <h3>Добавление чата</h3>
                    <div class="${styles.inputChat}">
                        {{{ InputNameChat }}}
                    </div>
                    <div class="${styles.error}">
                        {{#if addChatError }}
                            {{ addChatError }}
                        {{/if }}
                    </div>
                    <div class="${styles.actions}">
                        {{{ ButtonAddChat }}}
                        {{{ ButtonCloseAddChat }}}
                    </div>
                </form>
            </div>
        `
    }
}

interface StateInterface {
    addChatError: string,
}
const mapStateToProps = (state: StateInterface) => {
    return {
        addChatError: state.addChatError,
    }
}

export default connect(mapStateToProps)(AddChat as unknown as new (newProps: Props) => Block<Props>);

