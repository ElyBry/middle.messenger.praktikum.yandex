import { InputElement, ButtonElement } from "../components";
import styles from '../scss/signInUp.module.scss';
import Block from "../core/Block.ts";
import validInputs from "../validators/validInputs.ts";

const {checkLogin, checkPassword} = validInputs;

export default class SignIn extends Block {
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

        this.props.login = '';
        this.props.password = '';

        this.children = {
            ...this.children,
            InputLogin,
            InputPassword,
            ButtonLogin
        }
    }

    onChangeLogin(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkLogin(value);
        this.children.InputLogin.setProps(check);
        this.setProps({login: value});
    }
    onChangePassword(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkPassword(value);
        this.children.InputPassword.setProps(check);
        this.setProps({password: value});
    }

    onLogin(e: Event) {
        e.preventDefault();

        const errorLogin = checkLogin(this.props.login);
        const errorPassword = checkPassword(this.props.password);

        if (errorLogin.errorMessage || errorPassword.errorMessage) {
            this.children.InputLogin!.setProps(errorLogin);
            this.children.InputPassword!.setProps(errorPassword);
            return;
        }

        alert("Все данные введены верно, более подробная информация в консоли")
        console.log({
            login: this.props.login,
            password: this.props.password,
        })

    }

    render() {
        return `
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
                    <a class="${styles.exitIcon}" href="#" page="signUp">Нет аккаунта? {{> Icon name="chevron_left"}}</a>
                </div>
            </div>
        `
    }
}
