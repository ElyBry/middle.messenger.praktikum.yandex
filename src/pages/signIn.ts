import styles from '../scss/signInUp.module.scss';

const signUp = `
    <div class=${styles.root}>
        <div class=${styles.auth}>
            <h1>Авторизация</h1>
            <form>
                <div class=${styles.left}>
                    {{> Input name="login" label="Логин" defValue="Ivanov2004" type="text" required="1"}}
                    {{> Input name="password" label="Пароль" defValue="************" type="password" required="1"}}
                </div>
                <div class=${styles.left}>
                    {{> Button label="Войти" type="submit" icon="login"}}
                </div>
            </form>
            <a class="${styles.exitIcon}" href="#" page="signUp">Нет аккаунта? {{> Icon name="chevron_left"}}</a>
        </div>
    </div>
`

export default signUp;
