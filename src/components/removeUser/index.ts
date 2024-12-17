import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {ButtonElement} from "../button";

import {connect} from "../../utils/Connect.ts";
import * as chatsService from "../../services/chats.ts";
import {UserDTOResponse} from "../../api/type.ts";
import {User} from "../index.ts";

interface RemoveUserProps {
    closeRemove: (event: FocusEvent) => void,
    chatId: number,
    searchUsers: UserDTOResponse[],
    chatTitle: string,
}

class RemoveUser extends Block{
    constructor(props: RemoveUserProps) {
        super({
            ...props,
            closeRemove: props.closeRemove,
            chatUsers: [],
            chatId: props.chatId,
            name: '',
            usersList: [],
        });
    }
    init() {
        const onClickButtonAddBind = this.onClickButtonRemove.bind(this);
        const onSelectUserBind = this.onSelectUser.bind(this);

        const ButtonRemove = new ButtonElement({
            label: "Удалить",
            type: "submit",
            icon: "save",
            onClick: onClickButtonAddBind
        })
        const ButtonClose = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: this.props.closeRemove,
        });

        this.props.pickedUser = {};
        this.props.onSelectUser = onSelectUserBind;
        this.children = {
            ...this.children,
            ButtonClose,
            ButtonRemove,
        }
    }

    async getUsers(chatId: number) {
        await chatsService.getUsersChat(chatId);
    }
    onSelectUser(user: UserDTOResponse) {
        const userExists = this.props.pickedUsers?.some((existingUser: UserDTOResponse) => existingUser.id === user.id);

        if (userExists) {
            const updatedUsers = this.props.pickedUsers.filter((existingUser: UserDTOResponse) => existingUser.id !== user.id);
            this.setProps({ pickedUsers: updatedUsers });
        } else {
            const updatedUsers = this.props.pickedUsers ? [...this.props.pickedUsers, user] : [user];
            this.setProps({ pickedUsers: updatedUsers });
        }
    }
    onClickButtonRemove(e: Event) {
        e.preventDefault();
        const users = this.props.pickedUsers;

        const data = {
            users: users.map((user : UserDTOResponse) => user.id),
            chatId: this.props.chatId,
        };

        chatsService.deleteUsers(data);
        this.getUsers(this.props.chatId);
        this.props.closeRemove(e);
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }
        if (oldProps.name !== newProps.name) {
            const input = this.children.InputName as Block;
            input.setValue(newProps.name);
        }
        if (oldProps.chatId !== newProps.chatId) {
            this.getUsers(this.props.chatId);
        }
        if (oldProps.chatUsers !== newProps.chatUsers) {
            this.children.usersList = newProps.chatUsers?.map((userProps : UserDTOResponse) => {
                return new User({
                    user: userProps,
                    active: this.props.pickedUsers?.some((user: UserDTOResponse) => user.id === userProps.id),
                    onClick: () => {
                        if (this.props.onSelectUser) {
                            this.props.onSelectUser(userProps);
                        }
                    },
                });
            });
        }
        return true;
    }

    render() {
        const pickedUsers = this.props.pickedUsers;
        const usersList = this.children.usersList;

        if (!Array.isArray(usersList)) {
            throw new Error(`usersList должен являтсья массивом`);
        }
        usersList.forEach((user: Block) => {
            user.setProps({ active: pickedUsers?.some((existingUser : UserDTOResponse) => existingUser.id === user.props.user.id) });
        });

        return `
            <div class="${styles.module}">
                <form class="${styles.inputModule}">
                    <h3>Удаление пользователя</h3>
                    <h4>В чат {{ chatTitle }}</h4>
                    <div class="${styles.users}">
                        {{#each usersList}}
                            {{{ this }}}
                        {{/each }}
                    </div>
                    <div class="${styles.error}">
                        {{#if removeUserError }}
                            {{ removeUserError }}
                        {{/if }}
                    </div>
                    <div class="${styles.actions}">
                        {{{ ButtonRemove }}}
                        {{{ ButtonClose }}}
                    </div>
                </form>
            </div>
        `
    }
}

interface StateInterface {
    removeUserError: string,
    chatUsers: UserDTOResponse[],
}
const mapStateToProps = (state: StateInterface) => {
    return {
        removeUserError: state.removeUserError,
        chatUsers: state.chatUsers,
    }
}

export default connect(mapStateToProps)(RemoveUser as unknown as new (newProps: Props) => Block<Props>);
