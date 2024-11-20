import styles from '../scss/chats.module.scss';
import Block from "../core/Block.ts";
import {ButtonElement, InputElement, ListChats} from "../components";
import chatsMock from "../mocks/chatsMock.ts";

export default class Chats extends Block{
    init() {
        const onChangeInputSearchBind = this.onChangeInputSearch.bind(this);
        const onEnterInputSearchBind = this.onEnterInputSearch.bind(this);
        const onClickButtonAddBind = this.onClickButtonAdd.bind(this);

        const InputSearch = new InputElement({
            name: "search",
            type: "text",
            onBlur: onChangeInputSearchBind,
            onEnter: onEnterInputSearchBind
        });

        const ListChatsElement = new ListChats({
            chatsList: chatsMock,
        });

        const ButtonAddChat = new ButtonElement({
            label: "",
            type: "add",
            icon: "add",
            onClick: onClickButtonAddBind,
        });

        this.props.openChat = false;
        this.props.openChatId = 0;
        this.props.user = {};
        this.props.user.name = "Егор Ермаков";

        this.children = {
            ...this.children,
            InputSearch,
            ButtonAddChat,
            ListChatsElement,
        }
    }

    onClickButtonAdd() {
        console.log("Добавляем пользователя");
    }

    onEnterInputSearch() {
        console.log("Выполняется поиск...");
    }

    onChangeInputSearch(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;

        this.setProps({search: value});
    };

    render() {
        return `
            <div>
                <div class="${styles.chats}">
                    <div class="${styles.menu}">
                        <a href="/profile" class="${styles.me} ${styles.block}">
                            <div class="${styles.header}">
                                <div class="${styles.avatar}">
                                    {{> Avatar img="handsome-sensitive-red-head-man-smiling.jpg" }}
                                </div>
                                <div class="${styles.name}">
                                    ${this.props?.user?.name}
                                </div>
                            </div>
                        </a>
                        <div class="${styles.search} ${styles.block}">
                            {{{ InputSearch }}}
                            {{{ ButtonAddChat }}}
                        </div>
                        <div class="${styles.allChats} ${styles.block}">
                            {{{ ListChatsElement }}}
                        </div>
                    </div>
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
                                    {{> Icon name="settings"}}
                                </div>
                            </div>
                            <div class="${styles.chat}">
                                {{#each messages}}
                                    {{> Message}}
                                {{/each}}
                            </div>
                            <div class="${styles.message__send}">
                                <div class="${styles.plus}">
                                    {{> Icon name="add"}}
                                </div>
                                {{> Input defValue="Напишите сообщение"}}
                                {{> Button icon="send"}}
                            </div>
                        </div>
                    {{else}}
                        <div class="${styles.no__chat}">Выберите чат, чтобы отправить сообщение</div>
                    {{/if}}
                </div>
            </div>
        `
    }
};

