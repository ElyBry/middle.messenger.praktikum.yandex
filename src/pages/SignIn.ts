import {InputElement, ButtonElement, Link} from "../components";
import styles from '../scss/signInUp.module.scss';
import Block from "../core/Block.ts";
import validInputs from "../validators/validInputs.ts";
import {CONSTS} from "../CONSTS.ts";
import {withRouter} from "../routing/WithRouter.ts";
import {connect} from "../utils/Connect.ts";

import * as authService from '../services/auth.ts'

const {checkLogin, checkPassword} = validInputs;

class SignIn extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onLoginBind = this.onLogin.bind(this);

        const InputLogin = new InputElement({
            name: "login",
            label: "Логин",
            defValue: "Ivanov2004",
            type: "text",
            min: 3,
            max: 20,
            required: true,
            onBlur: onChangeLoginBind,
        });
        const InputPassword = new InputElement({
            name: "password",
            label: "Пароль",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            required: true,
            onBlur: onChangePasswordBind,
        })
        const ButtonLogin = new ButtonElement({
            label: "Войти",
            type: "submit",
            icon: "login",
            onClick: onLoginBind,
        });

        const LinkBack = new Link({
            text: "Нет аккаунта?",
            iconName: "chevron_left",
            class: styles.exitIcon,
            onClick: () => this.props.router.go(CONSTS.signUp),
        });

        this.props.login = '';
        this.props.password = '';

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            ButtonLogin,
            LinkBack
        }
    }

    onChangeLogin(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkLogin(value);
        this.setPropsForChildren(this.children.InputLogin, check);
        this.setProps({login: value});
    }
    onChangePassword(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkPassword(value, value);
        this.setPropsForChildren(this.children.InputPassword, check);
        this.setProps({password: value});
    }
    onLogin(e: Event) {
        e.preventDefault();

        const errorLogin = checkLogin(this.props.login);
        const errorPassword = checkPassword(this.props.password, this.props.password);

        if (errorLogin.errorMessage || errorPassword.errorMessage) {
            this.setPropsForChildren(this.children.InputLogin, errorLogin);
            this.setPropsForChildren(this.children.InputPassword, errorPassword);
            return;
        }

        const data = {
            login: this.props.login,
            password: this.props.password,
        }

        authService.signIn(data);
    }

    render() {
        return `
            {{#if isLoading}}
                <h1>spinner</h1>
            {{/if}}
            <div class=${styles.root}>
                <div class=${styles.auth}>
                    <h1>Авторизация</h1>
                    <form>
                        <div class=${styles.left}>
                            {{{ InputLogin }}}
                            {{{ InputPassword }}}
                        </div>
                        <div class=${styles.left}>
                            {{{ ButtonLogin }}}
                        </div>
                    </form>
                    <div class=${styles.error}>
                        {{#if signInError }}
                            <p>{{ signInError }}</p>
                        {{/if}}
                    </div>
                    {{{ LinkBack }}}
                </div>
            </div>
        `
    }
}

interface StateInterface {
    isLoading: boolean;
    signInError: string;
}
const mapStateToProps = (state: StateInterface) => {
    return {
        isLoading: state.isLoading,
        signInError: state.signInError,
    }
}

export default connect(mapStateToProps)(withRouter(SignIn));
