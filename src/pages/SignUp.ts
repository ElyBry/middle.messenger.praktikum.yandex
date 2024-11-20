import { InputElement, ButtonElement } from "../components";
import styles from '../scss/signInUp.module.scss';
import Block from "../core/Block.ts";
import validInputs from "../validators/validInputs.ts";

const { checkLogin, checkEmail, checkFirstSecondNames, checkPhone, checkPassword } = validInputs;

export default class SignUp extends Block {
    init() {
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onChangePasswordConfirmBind = this.onChangePasswordConfirm.bind(this);
        const onRegisterBind = this.onRegister.bind(this);

        const InputFirstName = new InputElement({
            name: "first_name",
            label: "Имя",
            defValue: "Ivan",
            type: "text",
            required: true,
            onBlur: onChangeFirstNameBind,
        });

        const InputSecondName = new InputElement({
            name: "second_name",
            label: "Фамилия",
            defValue: "Ivanov",
            type: "text",
            required: true,
            onBlur: onChangeSecondNameBind,
        });

        const InputPhone = new InputElement({
            name: "phone",
            label: "Номер телефона",
            defValue: "8 999 99 99",
            type: "phone",
            min: 10,
            required: true,
            onBlur: onChangePhoneBind,
        });

        const InputEmail = new InputElement({
            name: "email",
            label: "Почта",
            defValue: "ivanov2004@yandex.ru",
            type: "email",
            min: 3,
            required: true,
            onBlur: onChangeEmailBind,
        });

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
        const InputPasswordConfirm = new InputElement({
            name: "password_confirm",
            label: "Пароль(ещё раз)",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            required: true,
            onBlur: onChangePasswordConfirmBind,
        })

        const ButtonRegister = new ButtonElement({
            label: "Войти",
            type: "submit",
            icon: "login",
            onClick: onRegisterBind,
        });

        this.props.first_name = '';
        this.props.second_name = '';
        this.props.email = '';
        this.props.phone = '';
        this.props.login = '';
        this.props.password = '';

        this.children = {
            ...this.children,
            InputFirstName,
            InputSecondName,
            InputEmail,
            InputPhone,
            InputPasswordConfirm,
            InputLogin,
            InputPassword,
            ButtonRegister
        }
    }

    onChangeFirstName(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkFirstSecondNames(value);
        this.children.InputFirstName!.setProps(check);
        this.setProps({first_name: value});
    }
    onChangeSecondName(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkFirstSecondNames(value);
        this.children.InputSecondName!.setProps(check);
        this.setProps({second_name: value});
    }

    onChangeEmail(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkEmail(value);
        this.children.InputEmail!.setProps(check);
        this.setProps({email: value});
    }
    onChangePhone(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkPhone(value);
        this.children.InputPhone!.setProps(check);
        this.setProps({phone: value});
    }

    onChangeLogin(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkLogin(value);
        this.children.InputLogin!.setProps(check);
        this.setProps({login: value});
    }

    onChangePassword(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const confirm = this.props.passwordConfirm || '';
        const check = checkPassword(value, confirm);
        this.children.InputPasswordConfirm!.setProps(check);
        this.children.InputPassword!.setProps(check);
        this.setProps({password: value});
    }

    onChangePasswordConfirm(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const confirm = this.props.password || '';
        const check = checkPassword(value, confirm);
        this.children.InputPassword!.setProps(check);
        this.children.InputPasswordConfirm!.setProps(check);
        this.setProps({passwordConfirm: value});
    }

    onRegister(e: Event) {
        e.preventDefault();
        const firstNameError = checkFirstSecondNames(this.props.first_name);
        const secondNameError = checkFirstSecondNames(this.props.second_name);
        const emailError = checkEmail(this.props.email);
        const phoneError = checkPhone(this.props.phone);
        const loginError = checkLogin(this.props.login);
        const passwordError = checkPassword(this.props.password, this.props.passwordConfirm);
        if (firstNameError.errorMessage || secondNameError.errorMessage || emailError.errorMessage || phoneError.errorMessage || loginError.errorMessage || passwordError.errorMessage) {
            this.children.InputFirstName!.setProps(firstNameError);
            this.children.InputSecondName!.setProps(secondNameError);
            this.children.InputEmail!.setProps(emailError);
            this.children.InputPhone!.setProps(phoneError);
            this.children.InputPassword!.setProps(passwordError);
            this.children.InputPasswordConfirm!.setProps(passwordError);
            this.children.InputLogin!.setProps(loginError);
            return ;
        }

        alert("Все данные введены верно, более подробная информация в консоли");
        console.log({
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            email: this.props.email,
            phone: this.props.phone,
            login: this.props.login,
            password: this.props.password,
        });
    }

    render() {
        return `
            <div class=${styles.root}>
                <div class=${styles.auth}>
                    <h1>Регистрация</h1>
                    <form onsubmit="">
                        <div class=${styles.left}>
                            {{{ InputFirstName }}}
                            {{{ InputSecondName }}}
                            {{{ InputLogin }}}
                            {{{ InputEmail }}}
                            {{{ InputPhone }}}
                            {{{ InputPassword }}}
                            {{{ InputPasswordConfirm }}}
                        </div>
                        <div class=${styles.left}>
                            {{{ ButtonRegister }}}
                        </div>
                    </form>
                    <a class="${styles.exitIcon}" href="#" page="signIn">У меня уже есть аккаунт {{> Icon name="chevron_left"}}</a>
                </div>
            </div>
        `
    }
}


