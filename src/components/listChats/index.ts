import styles from './listChats.module.scss';

const ListChats =
    `
        <div class="${styles.listChats}">
            {{#each chats}}
                {{> Chats}}
            {{/each}}
        </div>
    `

export {ListChats};
