import styles from './chat.module.scss';
import Block from "../../core/Block.ts";
import {Message} from "../message";
import {InputElement} from "../input";
import {ButtonElement} from "../button";

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
        const onChangeMessageBind = this.onChangeMessage.bind(this);
        const onHoverAddBind = this.onHoverAdd.bind(this);
        const offHoverAddBind = this.offHoverAdd.bind(this);

        const InputMessage = new InputElement({
            name: "",
            defValue: "Введите сообщение...",
            type: "text",
            onChange: onChangeMessageBind,
        })

        const ButtonOptions = new ButtonElement({
            label: "",
            type: "open",
            icon: "settings",
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
        };
    }
    onHoverAdd() {
        this.setProps({openSettings: true});
    }

    offHoverAdd() {
        setTimeout(() => {
            this.setProps({openSettings: false});
        }, 500);
    }

    onChangeMessage(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({message: value});
    }

    onClickButtonSend() {
        if (!this.props.message) {
            console.log(`Сообщение пустое`);
            return;
        }
        console.log(`Отправляем сообщение ${this.props.message}`);
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
                        </div>
                    </div>
                    <div class="${styles.chat}">
                        {{#each messages}}
                            {{{ this }}}
                        {{/each}}
                    </div>
                    <div class="${styles.message__send}">
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
