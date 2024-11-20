import styles from './message.module.scss';

const Message =
    `
        <div class="${styles.message} {{#if me}} ${styles.me} {{/if}}">
            <div class="${styles.avatar}">
                {{> Avatar img="{{avatar}}" }}
            </div>
            <div class="${styles.messages__item}">
                <div class="${styles.messages__header}">
                    <div class="${styles.name}">
                        {{name}}
                    </div>
                    <div class="${styles.time}">
                        {{time}}
                    </div>
                </div>
                <div class="${styles.text}">
                    {{message}}
                </div>
            </div>
        </div>
    `

export {Message};
