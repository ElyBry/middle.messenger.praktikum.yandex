import styles from '../scss/profile.module.scss';
import Block from "../core/Block.ts";
import {ButtonElement, InputElement} from "../components";
import validInputs from "../validators/validInputs.ts";

const { checkLogin, checkEmail, checkFirstSecondNames, checkPhone, checkPassword } = validInputs;

interface UserInputs {
    display_name?: string,
    avatar?: string,
    first_name?: string;
    second_name?: string;
    email?: string;
    phone?: string;
    login?: string;
    password?: string;
}

export default class Profile extends Block {
    init() {
        const onChangeAvatarBind = this.onChangeAvatar.bind(this);
        const onChangeDisplayNameBind = this.onChangeDisplayName.bind(this);
        const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
        const onChangeSecondNameBind = this.onChangeSecondName.bind(this);
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onChangePhoneBind = this.onChangePhone.bind(this);
        const onChangeEmailBind = this.onChangeEmail.bind(this);
        const onChangePasswordBind = this.onChangePassword.bind(this);
        const onChangePasswordConfirmBind = this.onChangePasswordConfirm.bind(this);
        const onConfirmChangeBind = this.onConfirmChange.bind(this);
        const onChangeBind = this.onChange.bind(this);
        const onCancelBind = this.onCancel.bind(this);
        const onExitBind = this.onExit.bind(this);

        const InputAvatar = new InputElement({
            name: "avatar",
            label: "Аватар",
            type: "file",
            onBlur: onChangeAvatarBind,
        });

        const InputDisplayName = new InputElement({
            name: "display_name",
            label: "Отображаемое имя",
            defValue: "Ivanchella",
            type: "text",
            onBlur: onChangeDisplayNameBind,
        });

        const InputFirstName = new InputElement({
            name: "first_name",
            label: "Имя",
            defValue: "Ivan",
            type: "text",
            onBlur: onChangeFirstNameBind,
        });

        const InputSecondName = new InputElement({
            name: "second_name",
            label: "Фамилия",
            defValue: "Ivanov",
            type: "text",
            onBlur: onChangeSecondNameBind,
        });

        const InputPhone = new InputElement({
            name: "phone",
            label: "Номер телефона",
            defValue: "8 999 99 99",
            type: "phone",
            min: 10,
            onBlur: onChangePhoneBind,
        });

        const InputEmail = new InputElement({
            name: "email",
            label: "Почта",
            defValue: "ivanov2004@yandex.ru",
            type: "email",
            min: 3,
            onBlur: onChangeEmailBind,
        });

        const InputLogin = new InputElement({
            name: "login",
            label: "Логин",
            defValue: "Ivanov2004",
            type: "text",
            min: 3,
            max: 20,
            onBlur: onChangeLoginBind,
        });

        const InputPassword = new InputElement({
            name: "password",
            label: "Пароль",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            onBlur: onChangePasswordBind,
        })
        const InputPasswordConfirm = new InputElement({
            name: "password_confirm",
            label: "Пароль(ещё раз)",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            onBlur: onChangePasswordConfirmBind,
        })

        const ButtonConfirmChange = new ButtonElement({
            label: "Сохранить",
            type: "submit",
            icon: "save",
            onClick: onConfirmChangeBind,
        });
        const ButtonCancel = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCancelBind,
        });
        const ButtonChange = new ButtonElement({
            label: "Изменить",
            type: "change",
            icon: "arrow_forward",
            onClick: onChangeBind,
        });
        const ButtonExit = new ButtonElement({
            label: "Выйти из аккаунта",
            type: "exit",
            icon: "logout",
            onClick: onExitBind,
        })


        this.props.avatar = '';
        this.props.display_name = '';
        this.props.first_name = '';
        this.props.second_name = '';
        this.props.email = '';
        this.props.phone = '';
        this.props.login = '';
        this.props.password = '';
        this.props.isChange = false;

        this.children = {
            ...this.children,
            InputAvatar,
            InputDisplayName,
            InputFirstName,
            InputSecondName,
            InputEmail,
            InputPhone,
            InputPasswordConfirm,
            InputLogin,
            InputPassword,
            ButtonCancel,
            ButtonConfirmChange,
            ButtonChange,
            ButtonExit,
        }
    }

    onChangeAvatar(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setProps({display_name: value});
    }

    onChangeDisplayName(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkFirstSecondNames(value);
        this.setPropsForChildren(this.children.InputDisplayName, check);
        this.setProps({display_name: value});
    }

    onChangeFirstName(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const check = checkFirstSecondNames(value);
        this.setPropsForChildren(this.children.InputFirstName, check);
        this.setProps({first_name: value});
    }
    onChangeSecondName(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkFirstSecondNames(value);
        this.setPropsForChildren(this.children.InputSecondName, check);
        this.setProps({second_name: value});
    }

    onChangeEmail(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkEmail(value);
        this.setPropsForChildren(this.children.InputEmail, check);
        this.setProps({email: value});
    }
    onChangePhone(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkPhone(value);
        this.setPropsForChildren(this.children.InputPhone, check);
        this.setProps({phone: value});
    }

    onChangeLogin(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const check = checkLogin(value);
        this.setPropsForChildren(this.children.InputLogin, check);
        this.setProps({login: value});
    }

    onChangePassword(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const confirm = this.props.passwordConfirm || '';
        const check = checkPassword(value, confirm);
        this.setPropsForChildren(this.children.InputPasswordConfirm, check);
        this.setPropsForChildren(this.children.InputPassword, check);
        this.setProps({password: value});
    }

    onChangePasswordConfirm(e: Event) {
        const target = e.target as HTMLInputElement
        const value = target.value;
        const confirm = this.props.password || '';
        const check = checkPassword(value, confirm);
        this.setPropsForChildren(this.children.InputPasswordConfirm, check);
        this.setPropsForChildren(this.children.InputPassword, check);
        this.setProps({passwordConfirm: value});
    }

    onExit(e: Event) {
        e.preventDefault();
        console.log("Пользователь вышел...");
    }
    onCancel(e: Event) {
        e.preventDefault();
        this.setProps({isChange: false});
    }
    onChange(e: Event) {
        e.preventDefault();
        this.setProps({isChange: true});
    }

    onConfirmChange(e: Event) {
        e.preventDefault();
        const inputs: UserInputs = {};
        const fieldsToValidate = [
            { name: 'first_name', validator: checkFirstSecondNames },
            { name: 'second_name', validator: checkFirstSecondNames },
            { name: 'email', validator: checkEmail },
            { name: 'display_name', validator: checkFirstSecondNames },
            { name: 'phone', validator: checkPhone },
            { name: 'login', validator: checkLogin },
            { name: 'password', validator: checkPassword },
        ];

        let countChanges = 0;
        for (const field of fieldsToValidate) {
            if (this.props[field.name]) {
                countChanges++;
                const error = field.validator(this.props[field.name], this.props[field.name]);
                if (error.errorMessage) {
                    this.setPropsForChildren(this.children[`Input${this.capitalizeFirstLetter(field.name)}`], error);
                    return;
                }
                inputs[field.name as keyof UserInputs] = this.props[field.name];
            }
        }

        if (countChanges == 0) {
            alert("Никакие данные не изменены");
            return;
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
    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        if (this.props.isChange) {
            return `
                <div class=${styles.root}>
                    <div class=${styles.profile}>
                        <a class="${styles.back}" href="#" page="chats">К чатам {{> Icon name="chevron_left"}}</a>
                        <form onsubmit="">
                            <div class=${styles.block}>
                                <img src="/img/avatars/business-man-by-skyscraper.jpg" alt="Аватар"/>
                                {{{ InputAvatar }}}
                            </div>
                            <div class=${styles.block}>
                                {{{ InputDisplayName }}}
                            </div>
                            <div class=${styles.block}>
                                {{{ InputFirstName }}}
                                {{{ InputSecondName }}}
                                {{{ InputLogin }}}
                                {{{ InputPhone }}}
                                {{{ InputEmail }}}
                            </div>
                            <div class=${styles.block}>
                                {{{ InputPassword }}}
                                {{{ InputPasswordConfirm }}}
                            </div>
                            <div class="${styles.block}">
                                {{{ ButtonCancel }}}
                                {{{ ButtonConfirmChange }}}
                            </div>
                        </form>
                    </div>
                </div>
            `
        }
        return `
            <div class=${styles.root}>
                <div class=${styles.profile}>
                    <a class="${styles.back}" href="#" page="chats">К чатам {{> Icon name="chevron_left"}}</a>
                    <div class=${styles.block}>
                        <img src="/img/avatars/business-man-by-skyscraper.jpg" alt="Аватар"/>
                    </div>
                    <div class=${styles.block}>
                        {{> Field name="Отображаемый ник" value="Егор"}}
                    </div>
                    <div class=${styles.block}>
                        {{> Field name="Имя" value="Егор"}}
                        {{> Field name="Фамилия" value="Ермаков"}}
                        {{> Field name="Номер телефона" value="8 (999) 99 99 99"}}
                        {{> Field name="Почта" value="ermakov@gmail.com"}}
                    </div>
                    <div class="${styles.block}">
                        {{{ ButtonBack }}}
                        {{{ ButtonChange }}}
                        {{{ ButtonExit }}}
                    </div>
                </div>
            </div>
        `
    }
}
