import styles from './index.module.scss';
import Block from "../../core/Block.ts";

export default class Spinner extends Block {
    render() {
        return `
            <div class="${styles.loader}">
              <div class="${styles.inner} ${styles.one}"></div>
              <div class="${styles.inner} ${styles.two}"></div>
              <div class="${styles.inner} ${styles.three}"></div>
            </div>
        `
    }
}
