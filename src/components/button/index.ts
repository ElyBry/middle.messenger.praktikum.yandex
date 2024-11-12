import styles from './button.module.scss';

const Button =
    `
        <button class="${styles.button} button__{{type}}" type="{{type}}">
            {{label}}
            {{#if icon}}
                <span class="material-symbols-outlined">{{icon}}</span>
            {{/if}}
        </button>
    `

export {Button};
