import styles from './index.module.scss';
import Block from "../../core/Block.ts";

interface AddFilesProps {

}

export class AddFiles extends Block {
    constructor(props: AddFilesProps) {
        super({
            ...props
        });
    }
    render() {
        return `
            <div class=${styles.bubble}>
                <div class=${styles.item}>
                    {{> Icon name="add_a_photo" }}
                    <span class=${styles.text}>Фото или видео</span>
                </div>
                <div class=${styles.item}>
                    {{> Icon name="note_add" }}
                    <span class=${styles.text}>Файл</span>
                </div>
                <div class=${styles.item}>
                    {{> Icon name="add_task" }}
                    <span class=${styles.text}>Опрос</span>
                </div>
            </div>
        `
    }
}
