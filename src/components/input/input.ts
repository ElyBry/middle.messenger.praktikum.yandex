import Block from "../../core/Block.ts";

interface InputProps {
    events?: {
        keydown?: (e: KeyboardEvent) => void,
        input?: (e :FocusEvent) => void,
        blur?: (e: FocusEvent) => void
    },
}

class Input extends Block{
    constructor(props: InputProps) {
        super(props);
    }
    getValue(is?: string) {
        const input = this.getContent() as HTMLInputElement;
        if (is === 'file' && input.files) {
            return input.files[0];
        }
        return input.value;
    }
    setValue(value: string) {
        const input = this.getContent() as HTMLInputElement;
        input.value = value;
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
