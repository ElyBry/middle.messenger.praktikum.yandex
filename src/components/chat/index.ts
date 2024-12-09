import styles from './chat.module.scss';
import Block from "../../core/Block.ts";
import {Message} from "../message";
import {InputElement} from "../input";
import {ButtonElement} from "../button";
import {AddFiles} from "../addFiles";

import * as chatsService from '../../services/chats.ts';

interface ChatInfoProps {
    name: string,
    avatar: string,
    message: string,
    time: string,
    me?: boolean,
}
type ChatsProps = ChatInfoProps[];

interface ChatElementProps {
    chatInfo: ChatsProps,
    openChat?: boolean,
    openChatId?: number,
    onClick?: (event: FocusEvent) => void,
}

export class Chat extends Block{
    constructor(props: ChatElementProps) {
        super({
            ...props,
            openAddFiles: false,
            openSettings: true,
            messages: props.chatInfo.map(
                (chatProps: ChatInfoProps) =>
                    new Message({
                        ...chatProps,
                    }),
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

        this.children = {
            ...this.children,
            InputMessage,
            ButtonSend,
            ButtonOptions,
            ButtonAdd,
            AddFilesBubble
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
        console.log(`Отправляем сообщение ${value}`);
    }
    onChangeMessage(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({
            message: value
        });
    }

    onClickButtonSettings() {
        this.setProps({openSettings: !this.props.openSettings});
    }

    onClickButtonSend() {
        if (!this.props.message) {
            console.log(`Сообщение пустое`);
            return;
        }
        console.log(`Отправляем сообщение ${this.props.message}`);
    }

    componentDidUpdate(oldProps: ChatElementProps, newProps: ChatElementProps): boolean {
        if (oldProps.openChatId !== newProps.openChatId && newProps.openChatId &&  newProps.openChatId > 0) {
            console.log(newProps.openChatId);
            chatsService.getTokenChat(newProps.openChatId);
            return true;
        }
        return false;
    }

    render() {
        return `
            {{#if openChat }}
                <div class="${styles.message__window}">
                    <div class="${styles.header}">
                        <div class="${styles.avatar}">
                            {{> Avatar img="business-man-by-skyscraper.jpg" }}
                        </div>
                        <div class="${styles.name}">
                            Иван Иванов
                        </div>
                        <div class="${styles.actions}">
                            {{{ ButtonOptions }}}
                            {{#if openSettings }}
                                {{{ SettingsChat }}}
                            {{/if }}
                        </div>
                    </div>
                    <div class="${styles.chat}">
                        {{#each messages}}
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
