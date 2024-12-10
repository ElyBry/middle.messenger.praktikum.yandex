import styles from './index.module.scss';
import Block from "../../core/Block.ts";

interface FieldProps {
    name: string,
    value: string,
}
class Field extends Block {
    constructor(props: FieldProps) {
        super(props)
    }

    render() {
        return `
        <div class="${styles.field}">
            <div>{{name}}</div>
            <div>{{value}}</div>
        </div>
    `
    }
}

export { Field };
