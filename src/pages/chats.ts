import styles from '../scss/chats.module.scss';
import Block from "../core/Block.ts";
import {ButtonElement, Chat, InputElement, ListChats} from "../components";
import chatsMock from "../mocks/chatsMock.ts";
import dialogsMock from "../mocks/dialogsMock.ts";

export default class Chats extends Block{
    init() {
        const onEnterInputSearchBind = this.onEnterInputSearch.bind(this);
        const onClickButtonAddBind = this.onClickButtonAdd.bind(this);

        const InputSearch = new InputElement({
            name: "search",
            type: "text",
            onEnter: onEnterInputSearchBind,
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

        this.props.search = '';
        this.props.openChat = true;
        this.props.openChatId = -1;
        this.props.user = {};
        this.props.user.name = "Егор Ермаков";

        const ChatElement = new Chat({
            chatInfo: dialogsMock,
            openChat: this.props.openChat,
            openChatId: this.props.openChatId,
        })

        this.children = {
            ...this.children,
            InputSearch,
            ButtonAddChat,
            ListChatsElement,
            ChatElement
        }
    }

    onClickButtonAdd() {
        console.log("Добавляем пользователя");
    }

    onEnterInputSearch(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        console.log(`Выполняется поиск... ${value}`);
        this.setProps({search: value});
    }

    render() {
        return `
            <div>
                <div class="${styles.chats}">
                    <div class="${styles.menu}">
                        <a href="#" page="profile" class="${styles.me} ${styles.block}">
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
                    {{{ ChatElement }}}
                </div>
            </div>
        `
    }
};

