import styles from './input.module.scss';

const Input =
    `
        <div class="${styles.input}">
            <label for="{{name}}">{{label}}</label>
            <input type="{{type}}"
                   name="{{name}}"
                   id="{{name}}"
                   {{#if required }}
                    required="{{required}}"
                   {{/if}}
                   value="{{value}}"
                   placeholder="{{defValue}}"
                   name="{{name}}"
            />
        </div>
    `

export {Input};