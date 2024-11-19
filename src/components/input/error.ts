import Block from "../../core/Block.ts";
import styles from './input.module.scss';

class ErrorLine extends Block{
    render() {
        return `
            <div class=${styles.error}>{{errorMessage}}</div>
        `
    }
}
export { ErrorLine };