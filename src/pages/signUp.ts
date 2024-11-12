import styles from '../scss/signInUp.module.scss';

const signUp = `
    <div class=${styles.root}>
        <div class=${styles.auth}>
            <h1>Регистрация</h1>
            <form onsubmit="">
                <div class=${styles.left}>
                    {{> Input name="first_name" label="Имя" defValue="Иван" type="text" required="1"}}
                    {{> Input name="second_name" label="Фамилия" defValue="Иванов" type="text" required="1"}}
                    {{> Input name="login" label="Логин" defValue="Ivanov2004" type="text" required="1"}}
                    {{> Input name="email" label="Почта" defValue="ivanov2004@yandex.ru" type="email" required="1"}}
                    {{> Input name="phone" label="Номер телефона" defValue="8 999 99 99 99" type="phone" required="1"}}
                    {{> Input name="password" label="Пароль" defValue="************" type="password" required="1"}}
                    {{> Input name="password" label="Пароль(ещё раз)" defValue="************" type="password" required="1"}}
                </div>
                <div class=${styles.left}>
                    {{> Button label="Создать аккаунт" type="submit" icon="login"}}
                </div>
            </form>
            <a class="${styles.exitIcon}" href="#" page="signIn">У меня уже есть аккаунт {{> Icon name="chevron_left"}}</a>
        </div>
    </div>
`

export default signUp;
