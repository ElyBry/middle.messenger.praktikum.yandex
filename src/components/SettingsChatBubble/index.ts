import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import {ButtonElement} from "../button";

interface SettingsChatBubbleProps {
    class?: string,
    onAddUser: (e: Event) => void,
    onChangeAvatar: (e: Event) => void,
    onRemoveUser: (e: Event) => void,
}

class SettingsChatBubble extends Block {
    constructor(props: SettingsChatBubbleProps) {
        super({
            ...props,
            ButtonAddUser: new ButtonElement({
                label: "Добавить пользователя",
                onClick: props.onAddUser,
            }),
            ButtonRemoveUser: new ButtonElement({
                label: "Удалить пользователя",
                onClick: props.onRemoveUser,
            }),
            ButtonChangeAvatar: new ButtonElement({
                label: "Изменить аватар чата",
                onClick: props.onChangeAvatar,
            }),
        });
    }

    render() {
        const className = this.props.class ? this.props.class : styles.module;
        return `
            <div class="${className}">
                <div class="${styles.inputModule}">
                    {{{ ButtonAddUser }}}
                    {{{ ButtonRemoveUser }}}
                    {{{ ButtonChangeAvatar }}}
                </div>
            </div>
        `
    }
}

export default SettingsChatBubble;
