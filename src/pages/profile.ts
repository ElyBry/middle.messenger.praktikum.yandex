import styles from '../scss/profile.module.scss';

const Profile =
    `
        <div class=${styles.root}>
            {{#isEqual 
                isEditing true}}
                    <div class=${styles.profile}>
                        <div class=${styles.block}>
                            <img src="/img/avatars/business-man-by-skyscraper.jpg"/>
                            {{> Input name="avatar" type="file" label="Аватар"}}
                        </div>
                        <div class=${styles.block}>
                            {{> Input name="display_name" label="Отображаемый ник" value="Егор" type="text"}}
                        </div>
                        <div class=${styles.block}>
                            {{> Input name="first_name" label="Имя" value="Егор" type="text"}}
                            {{> Input name="second_name" label="Фамилия" value="Ермаков" type="text"}}
                            {{> Input name="login" label="Логин" value="егор" type="text"}}
                            {{> Input name="phone" label="Номер телефона" value="8 (999) 99 99 99" type="text"}}
                            {{> Input name="email" label="Почта" value="ermakov@gmail.com" type="email"}}
                        </div>
                        <div class=${styles.block}>
                            {{> Input name="oldPassword" label="Старый пароль" defValue="************" type="password"}}
                            {{> Input name="newPassword" label="Новый пароль" defValue="************" type="password"}}
                        </div>
                        <div class="${styles.block}">
                            {{> Button label="Отменить" type="cancel"}}
                            {{> Button label="Сохранить" type="save"}}
                        </div>
                    </div>
                {{else}}
                    <div class=${styles.profile}>
                        <div class=${styles.block}>
                            <img src="/img/avatars/business-man-by-skyscraper.jpg"/>
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
                            {{> Button label="Вернуться" type="cancel"}}
                            {{> Button label="Изменить данные" type="change"}}
                            {{> Button label="Выйти из аккаунта" type="exit"}}
                        </div>
                    </div>
               {{/isEqual}}
        </div>
    `


export default Profile;
