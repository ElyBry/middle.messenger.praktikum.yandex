import styles from '../scss/chats.module.scss';

const Chats =
    `
        <div class="${styles.chats}">
            <div class="${styles.menu}">
                <a href="/profile" class="${styles.me} ${styles.block}">
                    <div class="${styles.header}">
                        
                            <div class="${styles.avatar}">
                                <img src="/img/avatars/handsome-sensitive-red-head-man-smiling.jpg"/>
                            </div>
                            <div class="${styles.name}">
                                Егор Ермаков
                            </div>
                        
                    </div>
                </a>
                <div class="${styles.search} ${styles.block}">
                    <form>
                        {{> Input defValue="Поиск"}}
                        {{> Button label="+"}}
                    </form>
                </div>
                <div class="${styles.allChats} ${styles.block}">
                    {{> ListChats chats=chats}}
                </div>
            </div>
            {{#if openChat }}
                <div class="${styles.message__window}">
                    <div class="${styles.header}">
                        <div class="${styles.avatar}">
                            <img src="/img/avatars/business-man-by-skyscraper.jpg"/>
                        </div>
                        <div class="${styles.name}">
                            Иван Иванов
                        </div>
                        <div class="${styles.actions}">
                            {{> Icon name="settings"}}
                        </div>
                    </div>
                    <div class="${styles.chat}">
                        {{#each messages}}
                            {{> Message}}
                        {{/each}}
                    </div>
                    <div class="${styles.message__send}">
                        <div class="${styles.plus}">
                            {{> Icon name="add"}}
                        </div>
                        {{> Input defValue="Напишите сообщение"}}
                        {{> Button icon="send"}}
                    </div>
                </div>
            {{else}}
                <div class="${styles.no__chat}">Выберите чат, чтобы отправить сообщение</div>
            {{/if}}
        </div>
    `


export default Chats;
