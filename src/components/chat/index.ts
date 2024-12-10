import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {InputElement} from "../input";
import {ButtonElement} from "../button";
import {AddFiles} from "../addFiles";

import {Avatar, Message} from "../index.ts";
import {connect} from "../../utils/Connect.ts";
import {LastMessageUser} from "../../api/type.ts";

interface ChatInfoProps {
    id: number,
    created_by: number,
    avatar: string,
    last_message: LastMessageUser,
    title: string,
    unread_count: number,
}

interface ChatElementProps {
    pickedChat: ChatInfoProps,
    onClick?: (event: FocusEvent) => void,
}

class Chat extends Block{
    constructor(props: ChatElementProps) {
        super({
            ...props,
            messages: window.store.getState().messages || {},
            openAddFiles: false,
            openSettings: true,
            Messages: Object.values(window.store.getState().messages || {}).map(
                (messageProps: any) =>
                    new Message({
                        ...messageProps,
                    })
            ),
        });
    }
    init() {
        const onClickButtonSendBind = this.onClickButtonSend.bind(this);
        const onClickButtonSettingsBind = this.onClickButtonSettings.bind(this);
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onEnterMessageBind = this.onEnterMessage.bind(this);
        const onHoverAddBind = this.onHoverAdd.bind(this);
        const offHoverAddBind = this.offHoverAdd.bind(this);

        const AddFilesBubble = new AddFiles({});

        const InputMessage = new InputElement({
            name: "",
            defValue: "Введите сообщение...",
            type: "text",
            onChange: onChangeMessageBind,
            onEnter: onEnterMessageBind,
        })

        const ButtonOptions = new ButtonElement({
            label: "",
            type: "open",
            icon: "settings",
            onClick: onClickButtonSettingsBind,
        })

        const ButtonAdd = new ButtonElement({
            label: "",
            type: "open",
            icon: "add",
            onHover: {
                mouseover: onHoverAddBind,
                mouseout: offHoverAddBind,
            }
        })

        const ButtonSend = new ButtonElement({
            label: "",
            type: "send",
            icon: "send",
            onClick: onClickButtonSendBind,
        });

        const AvatarChat = new Avatar({
            img: this.props?.pickedChat?.avatar || '',
        });

        this.children = {
            ...this.children,
            InputMessage,
            ButtonSend,
            ButtonOptions,
            ButtonAdd,
            AddFilesBubble,
            AvatarChat,
        };
    }
    onHoverAdd() {
        this.setProps({openAddFiles: true});
    }

    offHoverAdd() {
        setTimeout(() => {
            this.setProps({openAddFiles: false});
        }, 1000);
    }

    onEnterMessage(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        if (!value) {
            console.log(`Сообщение пустое`);
            return;
        }
        this.sendMessage(value);
    }
    onChangeMessage(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({
            message: value
        });
    }
    sendMessage(value: string) {
        window.wsChat.sendMessage(value);
    }

    onClickButtonSettings() {
        this.setProps({openSettings: !this.props.openSettings});
    }

    onClickButtonSend() {
        if (!this.props.message) {
            console.log(`Сообщение пустое`);
            return;
        }
        this.sendMessage(this.props.message);
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        this.setPropsForChildren(this.children.AvatarChat, { img: newProps?.pickedChat?.avatar });
        if (newProps && newProps.messages) {
            this.children.Messages = Object.values(newProps.messages).map(
                (messageProps: any) =>
                    new Message({
                        ...messageProps,
                    })
            );
        }
        return true;
    }

    render() {
        const title = this.props?.pickedChat?.title || '';
        const messages = this.props.messages;
        if (messages !== null && Array.isArray(messages)) {

        }
        return `
            {{#if openChat }}
                <div class="${styles.message__window}">
                    <div class="${styles.header}">
                        <div class="${styles.avatar}">
                            {{{ AvatarChat }}}
                        </div>
                        <div class="${styles.name}">
                            ${title}
                        </div>
                        <div class="${styles.actions}">
                            {{{ ButtonOptions }}}
                            {{#if openSettings }}
                                {{{ SettingsChat }}}
                            {{/if }}
                        </div>
                    </div>
                    <div class="${styles.chat}">
                        {{#each Messages}}
                            {{{ this }}}
                        {{/each}}
                    </div>
                    <div class="${styles.message__send}">
                        <div class=${styles.actionAdd}>
                            {{#if openAddFiles}}
                                {{{ AddFilesBubble }}}
                            {{/if }}
                        </div>
                        <div class="${styles.plus}">
                            {{{ ButtonAdd }}}
                        </div>
                        {{{ InputMessage }}}
                        <div class="${styles.send}">
                            {{{ ButtonSend }}}
                        </div>
                    </div>
                </div>
            {{else}}
                <div class="${styles.no__chat}">Выберите чат, чтобы отправить сообщение</div>
            {{/if}}
        `
    }
}

interface StateInterface {
    messages: []
}
const mapStateToProps = (state: StateInterface) => {
    return {
        messages: state.messages,
    }
}

export default connect(mapStateToProps)(Chat as unknown as new (newProps: Props) => Block<Props>);

