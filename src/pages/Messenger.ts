import styles from '../scss/chats.module.scss';
import Block from "../core/Block.ts";
import {ButtonElement, Chat, InputElement, ListChats} from "../components";
import chatsMock from "../mocks/chatsMock.ts";
import dialogsMock from "../mocks/dialogsMock.ts";

export default class Chats extends Block{
    init() {
        const onEnterInputSearchBind = this.onEnterInputSearch.bind(this);
        const onClickButtonAddBind = this.onClickButtonAdd.bind(this);
        const onSelectChatBind = this.onSelectChat.bind(this);

        const InputSearch = new InputElement({
            name: "search",
            type: "text",
            onEnter: onEnterInputSearchBind,
        });

        const ListChatsElement = new ListChats({
            chatsList: chatsMock,
            onSelectChat: onSelectChatBind,
        });

        const ButtonAddChat = new ButtonElement({
            label: "",
            type: "add",
            icon: "add",
            onClick: onClickButtonAddBind,
        });

        this.props.search = '';
        this.props.openChat = false;
        this.props.openChatId = -1;
        this.props.openAddUser = false;
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
        this.setProps({openAddUser: !this.props.openAddUser});
        console.log("Добавляем пользователя", !this.props.openAddUser);
    }

    onSelectChat(chatId: number) {
        this.setPropsForChildren(this.children.ChatElement,{
            openChatId: chatId,
            openChat: true,
        });
        console.log(`ID: ${chatId}`);
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
                        <a href="#" page="settings" class="${styles.me} ${styles.block}">
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
