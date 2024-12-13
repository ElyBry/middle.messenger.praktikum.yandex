import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {connect} from "../../utils/Connect.ts";
import {ButtonElement, InputElement} from "../index.ts";
import * as usersService from '../../services/users.ts';

interface ChangePasswordProps {
    onCancel: (event: Event) => void;
}

class ChangePassword extends Block{
    constructor(props: ChangePasswordProps) {
        super({
            ...props,
            InputPasswordOld: new InputElement({
                name: 'password_old',
                label: 'Старый пароль',
                type: 'password',
                required: true,
            }),
            InputPassword: new InputElement({
                name: 'password_new',
                label: 'Новый пароль',
                type: 'password',
                required: true,
            }),
            ButtonClose: new ButtonElement({
                label: 'Отмена',
                icon: "arrow_back",
                onClick: props.onCancel,
            })
        });
    }
    init() {
        const onSavePasswordBind = this.onSavePassword.bind(this);

        const ButtonChange = new ButtonElement({
            label: 'Поменять пароль',
            onClick: onSavePasswordBind,
            icon: "save",
        });

        this.children = {
            ...this.children,
            ButtonChange,
        }
    }

    onSavePassword(e: Event) {
        e.preventDefault()
        const inputPassword = this.children.InputPassword as Block;
        const inputPasswordOld = this.children.InputPasswordOld as Block;
        const data = {
            oldPassword: inputPasswordOld.getValue() as string,
            newPassword: inputPassword.getValue() as string
        }
        usersService.changePassword(data);
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        return true;
    }

    render() {
        return `
            <div class="${styles.module}">
                <form class="${styles.inputModule}">
                    <h3>Измнение пароля</h3>
                    <div class="${styles.input}">
                        {{{ InputPasswordOld }}}
                        {{{ InputPassword }}}
                    </div>
                    <div class="${styles.error}">
                        {{#if changePasswordError }}
                            {{ changePasswordError }}
                        {{/if }}
                    </div>
                    <div class="${styles.actions}">
                        {{{ ButtonChange }}}
                        {{{ ButtonClose }}}
                    </div>
                </form>
            </div>
        `
    }
}

interface StateInterface {
    changePasswordError: string,
}
const mapStateToProps = (state: StateInterface) => {
    return {
        changePasswordError: state.changePasswordError,
    }
}

export default connect(mapStateToProps)(ChangePassword as unknown as new (newProps: Props) => Block<Props>);
