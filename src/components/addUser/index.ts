import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {InputElement} from "../input";
import {ButtonElement} from "../button";

import {connect} from "../../utils/Connect.ts";
import * as chatsService from "../../services/chats.ts";
import * as usersService from "../../services/users.ts";
import {UserDTOResponse} from "../../api/type.ts";
import {User} from "../index.ts";

interface AddUserProps {
    closeAdd: (event: FocusEvent) => void,
    chatId: number,
    searchUsers: UserDTOResponse[],
}

class AddUser extends Block{
    constructor(props: AddUserProps) {
        super({
            ...props,
            closeAdd: props.closeAdd,
            searchUsers: [],
            chatId: props.chatId,
            name: '',
            usersList: [],
        });
    }
    init() {
        const onInputNameBind = this.onInputName.bind(this);
        const onClickButtonAddBind = this.onClickButtonAdd.bind(this);
        const onSelectUserBind = this.onSelectUser.bind(this);

        const ButtonAdd = new ButtonElement({
            label: "Добавить",
            type: "submit",
            icon: "save",
            onClick: onClickButtonAddBind
        })
        const ButtonClose = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: this.props.closeAdd,
        });
        const InputName = new InputElement({
            label: "Id пользователя",
            name: "name",
            type: "text",
            onBlur: onInputNameBind,
        });
        this.props.pickedUser = {};
        this.props.onSelectUser = onSelectUserBind;
        this.children = {
            ...this.children,
            ButtonClose,
            InputName,
            ButtonAdd,
        }
    }
    onSelectUser(user: UserDTOResponse) {
        console.log(user);
        const userExists = this.props.pickedUsers?.some((existingUser: UserDTOResponse) => existingUser.id === user.id);

        if (userExists) {
            const updatedUsers = this.props.pickedUsers.filter((existingUser: UserDTOResponse) => existingUser.id !== user.id);
            this.setProps({ pickedUsers: updatedUsers });
        } else {
            const updatedUsers = [user];
            this.setProps({ pickedUsers: updatedUsers });
        }
    }
    onClickButtonAdd(e: Event) {
        e.preventDefault();
        const data = {
            users: [
                this.props.name,
            ],
            chatId: this.props.chatId,
        }

        chatsService.addUser(data);
        this.setProps({name: ''});
        this.props.closeAdd(e);
    }

    onInputName(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({name: value});
        usersService.getUsers( {login: value});
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }
        if (oldProps.name !== newProps.name) {
            const input = this.children.InputName as Block;
            input.setValue(newProps.name);
        }
        if (oldProps.searchUsers !== newProps.searchUsers) {
            this.children.usersList = newProps.searchUsers?.map((userProps : UserDTOResponse) => {
                return new User({
                    user: userProps,
                    active: this.props.pickedUsers?.some((user: UserDTOResponse) => user.id === userProps.id),
                    onClick: this.props.onSelectUser(userProps),
                });
            });
        }
        return true;
    }

    render() {
        console.log(this.props.pickedUsers);
        return `
            <div class="${styles.module}">
                <form class="${styles.inputModule}">
                    <h3>Добавление пользователя</h3>
                    <h4>В чат {{ chatId }}</h4>
                    <div class="${styles.input}">
                        {{{ InputName }}}
                    </div>
                    <div class="${styles.users}">
                        {{#each usersList}}
                            {{{ this }}}
                        {{/each }}
                    </div>
                    <div class="${styles.error}">
                        {{#if addUserError }}
                            {{ addUserError }}
                        {{/if }}
                    </div>
                    <div class="${styles.actions}">
                        {{{ ButtonAdd }}}
                        {{{ ButtonClose }}}
                    </div>
                </form>
            </div>
        `
    }
}

interface StateInterface {
    addUserError: string,
    searchUsers: UserDTOResponse[],
}
const mapStateToProps = (state: StateInterface) => {
    return {
        addUserError: state.addUserError,
        searchUsers: state.searchUsers,
    }
}

export default connect(mapStateToProps)(AddUser as unknown as new (newProps: Props) => Block<Props>);

