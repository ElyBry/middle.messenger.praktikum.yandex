import styles from '../scss/chats.module.scss';
import Block, {Props} from "../core/Block.ts";
import {AddChat, ButtonElement, Chat, InputElement, ListChats, SettingsChatBubble, TopMenu} from "../components";
import * as chatsService from '../services/chats.ts';
import {CONSTS} from "../CONSTS.ts";
import {connect} from "../utils/Connect.ts";
import {withRouter} from "../routing/WithRouter.ts";

class Messenger extends Block{
    init() {
        const onEnterInputSearchBind = this.onEnterInputSearch.bind(this);
        const onSelectChatBind = this.onSelectChat.bind(this);
        const onAddUserBind = this.onAddUser.bind(this);
        const onRemoveUserBind = this.onRemoveUser.bind(this);
        const onChangeAvatarBind = this.onChangeAvatar.bind(this);
        const onOpenSettingsBind = this.onOpenSettings.bind(this);
        const onClickButtonOpenAddChatBind = this.onClickButtonOpenAddChat.bind(this);

        const InputSearch = new InputElement({
            name: "search",
            type: "text",
            onEnter: onEnterInputSearchBind,
        });

        this.props.chats = [];
        this.props.chatInfo = [];
        this.props.gotoSettings = () => this.props.router.go(CONSTS.settings);
        this.props.search = '';
        this.props.openChat = false;
        this.props.openChatId = -1;
        this.props.openAddChat = false;
        this.props.openAddUser = false;
        this.props.openSettings = false;
        this.props.user = {};
        this.props.user.name = window.store?.getState()?.user?.display_name || '';

        const ListChatsElement = new ListChats({
            chatsList: this.props.chats,
            onSelectChat: onSelectChatBind,
        });

        const ChatElement = new Chat({
            onOpenSettings: onOpenSettingsBind,
        });

        const Settings = new TopMenu({
            onClick: () => this.props.router.go(CONSTS.settings),
        });

        const SettingsChat = new SettingsChatBubble({
            onAddUser: onAddUserBind,
            onRemoveUser: onRemoveUserBind,
            onChangeAvatar: onChangeAvatarBind,
        })
        const ButtonOpenAddChat = new ButtonElement({
            label: "",
            type: "add",
            icon: "add",
            onClick: onClickButtonOpenAddChatBind,
        });

        const addChatElement = new AddChat({
            openAddChat: this.props.openAddChat,
        })
        const getChats = async (offset: number, limit: number, title?: string) => {
            await chatsService.getChats({offset, limit, title});
        };
        getChats(CONSTS.offset,CONSTS.limit);

        this.children = {
            ...this.children,
            InputSearch,
            ListChatsElement,
            ChatElement,
            Settings,
            SettingsChat,
            ButtonOpenAddChat,
            addChatElement,
        }
    }
    onClickButtonOpenAddChat() {
        this.setProps({openAddChat: !this.props.openAddChat});
    }
    onOpenSettings(e: Event) {
        e.preventDefault();
        this.setProps({openSettings: !this.props.openSettings});
    }
    onAddUser(e: Event) {
        e.preventDefault();
        this.setProps({isAddUser: !this.props.isAddUser});
    }
    onRemoveUser(e: Event) {
        e.preventDefault();
        this.setProps({isRemoveUser: !this.props.isRemoveUser});
    }
    onChangeAvatar(e: Event) {
        e.preventDefault();
        this.setProps({isChangeAvatar: !this.props.isChangeAvatar});
    }
    async onSelectChat(chatProps: {id: number, title: string}) {
        if (this.props.openChatId === chatProps.id) {
            return;
        }
        this.setProps({openChatId: chatProps.id});
        this.setPropsForChildren(this.children.ListChatsElement, {openChatId: chatProps.id});
        await chatsService.getTokenChat(chatProps.id);

        this.setPropsForChildren(this.children.ChatElement, {
            openChat: true,
            pickedChat: chatProps,
        });

        console.log(`ID: ${chatProps.id}, ${chatProps.title}`);
    }

    onEnterInputSearch(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        console.log(`Выполняется поиск... ${value}`);
        this.setProps({search: value});
    }

    componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }
        if (oldProps?.openAddChat !== newProps?.openAddChat) {
            console.log(newProps?.openAddChat);
            this.setPropsForChildren(this.children.addChatElement, {openAddChat: newProps?.openAddChat});
        }
        return true;
    }

    render() {
        return `
            <div>
                <div class="${styles.chats}">
                    {{#if isLoading}}
                        <h1>spinner</h1>
                    {{/if}}
                    {{#if openSettings }}
                        {{{ SettingsChat }}}
                    {{/if }}
                    {{#if openAddChat}}
                        {{{ addChatElement }}}
                    {{/if }}
                    <div class="${styles.menu}">
                        {{{ Settings }}}
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
}
const mapStateToProps = (state: StateInterface) => {
    return {
        isLoading: state.isLoading,
    }
}

export default connect(mapStateToProps)(withRouter(Messenger));