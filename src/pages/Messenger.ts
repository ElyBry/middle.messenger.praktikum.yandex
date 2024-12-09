import styles from '../scss/chats.module.scss';
import Block, {Props} from "../core/Block.ts";
import {ButtonElement, Chat, InputElement, Link, ListChats} from "../components";
import * as chatsService from '../services/chats.ts';
import {CONSTS} from "../CONSTS.ts";
import {connect} from "../utils/Connect.ts";
import {withRouter} from "../routing/WithRouter.ts";

class Messenger extends Block{
    init() {
        const onEnterInputSearchBind = this.onEnterInputSearch.bind(this);
        const onClickButtonOpenAddChatBind = this.onClickButtonOpenAddChat.bind(this);
        const onClickButtonAddChatBind = this.onClickButtonAddChat.bind(this);
        const onInputNameChatBind = this.onInputNameChat.bind(this);
        const onCloseAddChatBind = this.onCloseAddChat.bind(this);
        const onSelectChatBind = this.onSelectChat.bind(this);

        const InputSearch = new InputElement({
            name: "search",
            type: "text",
            onEnter: onEnterInputSearchBind,
        });

        const ButtonOpenAddChat = new ButtonElement({
            label: "",
            type: "add",
            icon: "add",
            onClick: onClickButtonOpenAddChatBind,
        });
        const ButtonAddChat = new ButtonElement({
            label: "Добавить",
            type: "submit",
            icon: "save",
            onClick: onClickButtonAddChatBind
        })
        const InputNameChat = new InputElement({
            name: "search",
            type: "text",
            onBlur: onInputNameChatBind,
        });
        const ButtonCloseAddChat = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCloseAddChatBind,
        });

        this.props.chats = [];
        this.props.chatInfo = [];
        this.props.gotoSettings = () => this.props.router.go(CONSTS.settings);
        this.props.search = '';
        this.props.openChat = false;
        this.props.openChatId = -1;
        this.props.openAddChat = false;
        this.props.openAddUser = false;
        this.props.user = {};
        this.props.user.name = window.store?.getState()?.user?.display_name || '';

        const ListChatsElement = new ListChats({
            chatsList: this.props.chats,
            onSelectChat: onSelectChatBind,
        });

        const ChatElement = new Chat({
            chatInfo: this.props.chatInfo,
            openChat: this.props.openChat,
            openChatId: this.props.openChatId,
        });

        const SettingsLink = new Link({
            onClick: () => this.props.router.go(CONSTS.settings),
            inner: `
                <div class="${styles.header}">
                    <div class="${styles.avatar}">
                        {{> Avatar img="handsome-sensitive-red-head-man-smiling.jpg" }}
                    </div>
                    <div class="${styles.name}">
                        ${this.props?.user?.name}
                    </div>
                </div>
            `
        });

        const getChats = async (offset: number, limit: number, title?: string) => {
            await chatsService.getChats({offset, limit, title});
        };
        getChats(CONSTS.offset,CONSTS.limit);

        this.children = {
            ...this.children,
            InputSearch,
            ButtonOpenAddChat,
            ListChatsElement,
            ChatElement,
            SettingsLink,
            ButtonCloseAddChat,
            ButtonAddChat,
            InputNameChat,
        }
    }

    onClickButtonOpenAddChat() {
        this.setProps({openAddChat: true});
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

    componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
        if (oldProps !== newProps) {
            this.setPropsForChildren(this.children.ListChatsElement, newProps);
            return true;
        }
        return false;
    }

    render() {
        return `
            <div>
                <div class="${styles.chats}">
                    {{#if openAddChat}}
                        <div class="${styles.module}">
                            {{{ ButtonCloseAddChat }}}
                            <h3>Добавление чата</h3>
                            {{{ InputNameChat }}}
                            {{#if addChatError }}
                                {{ addChatError }}
                            {{/if }}
                            <div class="${styles.actions}">
                                {{{ ButtonAddChat }}}
                            </div>
                        </div>
                    {{/if }}
                    <div class="${styles.menu}">
                        {{{ SettingsLink }}}
                        <div class="${styles.search} ${styles.block}">
                            {{{ InputSearch }}}
                            {{{ ButtonOpenAddChat }}}
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

export default connect(mapStateToProps)(withRouter(Messenger));