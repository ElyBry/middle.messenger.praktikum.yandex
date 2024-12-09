import styles from '../scss/profile.module.scss';
import Block from "../core/Block.ts";
import {ButtonElement, Field, InputElement, Link} from "../components";
import validInputs from "../validators/validInputs.ts";
import {connect} from "../utils/Connect.ts";
import {withRouter} from "../routing/WithRouter.ts";
import {CONSTS} from "../CONSTS.ts";
import * as authService from "../services/auth.ts";
import * as userService from "../services/users.ts";

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

class Settings extends Block {
    init() {
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
        const onOpenChangerAvatarBind = this.onOpenChangerAvatar.bind(this);
        const onCloseChangerAvatarBind = this.onCloseChangerAvatar.bind(this);
        const onLoadAvatarBind = this.onLoadAvatar.bind(this);
        const onSaveAvatarBind = this.onSaveAvatar.bind(this);
        const onOpenChangerPasswordBind = this.onOpenChangerPassword.bind(this);
        const onCloseChangerPasswordBind = this.onCloseChangerPassword.bind(this);
        const onSavePasswordBind = this.onSavePassword.bind(this);

        const InputPassword = new InputElement({
            name: "password",
            label: "Пароль",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            onBlur: onChangePasswordBind,
        });
        const InputPasswordConfirm = new InputElement({
            name: "password_confirm",
            label: "Пароль(ещё раз)",
            defValue: "************",
            type: "password",
            min: 8,
            max: 40,
            onBlur: onChangePasswordConfirmBind,
        });

        const ButtonChangeAvatar = new ButtonElement({
            label: "Поменять аватар",
            type: "change",
            icon: "change",
            onClick: onOpenChangerAvatarBind,
        });
        const ButtonChangePassword = new ButtonElement({
            label: "Поменять пароль",
            type: "change",
            icon: "change",
            onClick: onOpenChangerPasswordBind,
        })

        const ButtonConfirmChange = new ButtonElement({
            label: "Сохранить",
            type: "submit",
            icon: "save",
            onClick: onConfirmChangeBind,
        });
        const ButtonConfirmChangePassword = new ButtonElement({
            label: "Сохранить",
            type: "submit",
            icon: "save",
            onClick: onSavePasswordBind,
        });
        const ButtonConfirmChangeAvatar = new ButtonElement({
            label: "Сохранить",
            type: "submit",
            icon: "save",
            onClick: onSaveAvatarBind,
        });
        const ButtonCancel = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCancelBind,
        });
        const ButtonCancelChangeAvatar = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCloseChangerAvatarBind,
        });
        const ButtonCancelChangePassword = new ButtonElement({
            label: "Отменить",
            type: "cancel",
            icon: "arrow_back",
            onClick: onCloseChangerPasswordBind,
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
        });
        const BackLink = new Link({
            class: styles.back,
            text: "К чатам",
            iconName: "chevron_left",
            onClick: () => window.router.go(CONSTS.messenger),
        });

        this.props.user = window.store.getState().user;
        this.props.avatar = this.props.user.avatar;
        this.props.display_name = this.props.user.display_name;
        this.props.first_name = this.props.user.first_name;
        this.props.second_name = this.props.user.second_name;
        this.props.email = this.props.user.email;
        this.props.phone = this.props.user.phone;
        this.props.login = this.props.user.login;
        this.props.password = '';
        this.props.changeAvatar = false;
        this.props.isChange = false;

        const InputAvatar = new InputElement({
            name: "avatar",
            label: "Аватар",
            type: "file",
            onChange: onLoadAvatarBind,
        });

        const InputDisplayName = new InputElement({
            name: "display_name",
            label: "Отображаемое имя",
            value: this.props.display_name,
            defValue: "Ivanchella",
            type: "text",
            onBlur: onChangeDisplayNameBind,
        });

        const InputFirstName = new InputElement({
            name: "first_name",
            label: "Имя",
            value: this.props.first_name,
            defValue: "Ivan",
            type: "text",
            onBlur: onChangeFirstNameBind,
        });

        const InputSecondName = new InputElement({
            name: "second_name",
            label: "Фамилия",
            value: this.props.second_name,
            defValue: "Ivanov",
            type: "text",
            onBlur: onChangeSecondNameBind,
        });

        const InputPhone = new InputElement({
            name: "phone",
            label: "Номер телефона",
            value: this.props.phone,
            defValue: "8 999 99 99",
            type: "phone",
            min: 10,
            onBlur: onChangePhoneBind,
        });

        const InputEmail = new InputElement({
            name: "email",
            label: "Почта",
            value: this.props.email,
            defValue: "ivanov2004@yandex.ru",
            type: "email",
            min: 3,
            onBlur: onChangeEmailBind,
        });

        const InputLogin = new InputElement({
            name: "login",
            label: "Логин",
            value: this.props.login,
            defValue: "Ivanov2004",
            type: "text",
            min: 3,
            max: 20,
            onBlur: onChangeLoginBind,
        });

        const FieldFirstName = new Field({
            name: "Имя",
            value: this.props.first_name || "-",
        });
        const FieldSecondName = new Field({
            name: "Фамилия",
            value: this.props.second_name || "-",
        });
        const FieldDisplayName = new Field({
            name: "Отображаемый ник",
            value: this.props.display_name || "-",
        });
        const FieldNumberPhone = new Field({
            name: "Номер телефона",
            value: this.props.phone || "-",
        });
        const FieldEmail = new Field({
            name: "Почта",
            value: this.props.email || "-",
        });

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
            BackLink,
            FieldFirstName,
            FieldDisplayName,
            FieldNumberPhone,
            FieldEmail,
            FieldSecondName,
            ButtonChangeAvatar,
            ButtonChangePassword,
            ButtonCancelChangeAvatar,
            ButtonCancelChangePassword,
            ButtonConfirmChangePassword,
            ButtonConfirmChangeAvatar,
        };
    };

    onLoadAvatar(e: Event) {
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

        authService.logout();
    }
    onCancel(e: Event) {
        e.preventDefault();
        this.setProps({isChange: false});
    }

    onOpenChangerAvatar(e: Event) {
        e.preventDefault();
        this.setProps({isChangeAvatar: true});
    }
    onCloseChangerAvatar(e: Event) {
        e.preventDefault();
        this.setProps({isChangeAvatar: false});
    }
    onSaveAvatar(e: Event) {
        e.preventDefault()
        // Проверка типа
        // Загрузка через Api
        console.log("Меняем аву");
        // Если успешно
        this.setProps({isChangeAvatar: false});
    }


    onOpenChangerPassword(e: Event) {
        e.preventDefault();
        this.setProps({isChangePassword: true});
    }
    onCloseChangerPassword(e: Event) {
        e.preventDefault();
        this.setProps({isChangePassword: false});
    }
    onSavePassword(e: Event) {
        e.preventDefault();
        // Проверка типа
        // Загрузка через Api
        console.log("Меняем пароль");
        // Если успешно
        this.setProps({isChangePassword: false});
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
        const data = {
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            display_name: this.props.display_name,
            email: this.props.email,
            phone: this.props.phone,
            login: this.props.login,
            password: this.props.password,
        };
        userService.changeProfile(data);
    }
    capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        if (this.props.isChange) {
            return `
                <div class=${styles.root}>
                    <div class=${styles.profile}>
                        {{{ BackLink }}}
                        <form onsubmit="">
                            <div class=${styles.block}>
                                <img src="/img/avatars/business-man-by-skyscraper.jpg" alt="Аватар"/>
                                {{{ ButtonChangeAvatar }}}
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
                    {{{ BackLink }}}
                    <div class=${styles.block}>
                        <img src="/img/avatars/business-man-by-skyscraper.jpg" alt="Аватар"/>
                    </div>
                    <div class=${styles.block}>
                        {{{ FieldDisplayName }}} 
                    </div>
                    <div class=${styles.block}>
                        {{{ FieldFirstName }}}
                        {{{ FieldSecondName }}}
                        {{{ FieldNumberPhone }}}
                        {{{ FieldEmail }}}
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

interface StateInterface {
    isLoading: boolean;
    changeProfileError: string;
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
}
const mapStateToProps = (state: StateInterface) => {
    return {
        isLoading: state.isLoading,
        changeProfileError: state.changeProfileError,
        first_name: state.first_name,
        second_name: state.second_name,
        display_name: state.display_name,
        login: state.login,
        email: state.email,
        phone: state.phone,
    }
}

export default connect(mapStateToProps)(withRouter(Settings));
