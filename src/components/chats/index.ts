import styles from './chats.module.scss';

const Chats =
    `
        <div class="${styles.chats} {{#if active}} ${styles.active} {{/if}}">
            <div class="${styles.leftSide}">
                <div class="${styles.avatar}">
                    {{#isEqual isOnline true}}
                        <div class="${styles.online}"></div>
                    {{else}}
                        <div class="${styles.offline}"></div>
                    {{/isEqual}}
                    <img src="img/avatars/{{ avatar }}" alt="Аватар" />
                </div>
                <div class="${styles.name_and_message}">
                    <div class="${styles.name}">
                        {{name}}
                    </div>
                    <div class="${styles.message} {{#if isTyping}} typing {{/if}}">
                        {{lastMessage}}
                    </div>
                </div>
            </div>
            
            <div class="${styles.time}">
                {{time}}
            </div>
        </div>
    `

export {Chats};
