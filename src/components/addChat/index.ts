import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {InputElement} from "../input";
import {ButtonElement} from "../button";

import {connect} from "../../utils/Connect.ts";
import * as chatsService from "../../services/chats.ts";

interface AddChatProps {
    closeAddChat: (event: FocusEvent) => void,
}

class AddChat extends Block{
    constructor(props: AddChatProps) {
        super({
            ...props,
            closeAddChat: props.closeAddChat,
        });
    }
    init() {
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
            onClick: this.props.closeAddChat,
        });
        const InputNameChat = new InputElement({
            name: "name",
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
        this.setProps({chatName: ''});
    }

    onInputNameChat(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({chatName: value});
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }
        if (oldProps.chatName !== newProps.chatName) {
            const input = this.children.InputNameChat as Block;
            input.setValue(newProps.chatName);
        }
        return true;
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

