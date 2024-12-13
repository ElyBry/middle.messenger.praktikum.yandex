import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {InputElement} from "../input";
import {ButtonElement} from "../button";
import {AddFiles} from "../addFiles";

import {Avatar, Message} from "../index.ts";
import {connect} from "../../utils/Connect.ts";
import {MessageResponse} from "../../api/type.ts";

interface ChatElementProps {
    onOpenSettings: (event: FocusEvent) => void,
}

class Chat extends Block{
    constructor(props: ChatElementProps) {
        super({
            ...props,
            messages: window.store.getState().messages || {},
            openAddFiles: false,
            onOpenSettings: props.onOpenSettings,
            Messages: Object.values(window.store.getState().messages as MessageResponse || {})
                .filter(
                    (value): value is MessageResponse => value !== null && typeof value === 'object'
                )
                .reverse()
                .map(
                (messageProps: MessageResponse) =>
                    new Message({
                        ...messageProps,
                    })
            ),
        });
    }
    init() {
        const onClickButtonSendBind = this.onClickButtonSend.bind(this);
        const onEnterMessageBind = this.onEnterMessage.bind(this);
        const onHoverAddBind = this.onHoverAdd.bind(this);
        const offHoverAddBind = this.offHoverAdd.bind(this);

        const AddFilesBubble = new AddFiles({});

        const InputMessage = new InputElement({
            name: "",
            defValue: "Введите сообщение...",
            type: "text",
            onEnter: onEnterMessageBind,
        })

        const ButtonOptions = new ButtonElement({
            label: "",
            type: "open",
            icon: "settings",
            onClick: this.props.onOpenSettings,
        })

        const ButtonAdd = new ButtonElement({
            label: "",
            type: "open",
            icon: "add",
            onHover: {
                mouseover: onHoverAddBind,
                mouseout: offHoverAddBind,
            }
        });

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

    sendMessage(value: string) {
        window.wsChat.sendMessage(value);
        const input = this.children.InputMessage as Block;
        input.setValue('');
    }

    onClickButtonSend() {
        const input = this.children.InputMessage as Block;
        const value = input.getValue() as string;
        if (!value) {
            console.log(`Сообщение пустое`);
            return;
        }
        this.sendMessage(value);
    }
    scrollToBottom(element: Block) {
        if (element) {
            const messageElement = element.element;
            if (messageElement) {
                messageElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start"
                });
            }
        }
    }
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }
        this.setPropsForChildren(this.children.AvatarChat, { img: newProps?.pickedChat?.avatar });
        if (newProps && newProps.messages) {
            this.children.Messages = Object.values(newProps.messages as MessageResponse || {})
                .filter(
                    (value): value is MessageResponse => value !== null
                        && typeof value === 'object'
                )
                .reverse()
                .map(
                    (messageProps: MessageResponse) =>
                        new Message({
                            ...messageProps,
                        })
                )
            const lastMessage = this.children.Messages[this.children.Messages.length - 1];
            setTimeout(() => {
                this.scrollToBottom(lastMessage);
            }, 0)
        }
        return true;
    }

    render() {
        const title = this.props?.pickedChat?.title || '';
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
