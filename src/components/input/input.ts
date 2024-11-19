import Block from "../../core/Block.ts";

class Input extends Block{
    constructor(props:{}) {
        super(props)
    }
    render() {
        return `
            <input type="{{type}}"
                   name="{{name}}"
                   id="{{name}}"
                   minlength="{{min}}"
                   maxlength="{{max}}"
                   {{#if required }}
                    required="{{required}}"
                   {{/if}}
                   value="{{value}}"
                   placeholder="{{defValue}}"
                   name="{{name}}"
            />
        `
    }
}
export { Input };