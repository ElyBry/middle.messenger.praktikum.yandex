import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {connect} from "../../utils/Connect.ts";
import {ButtonElement, InputElement} from "../index.ts";
import * as usersService from '../../services/users.ts';

interface ChangeAvatarProps {
    onCancel: (event: Event) => void;
}

class ChangeAvatar extends Block{
    constructor(props: ChangeAvatarProps) {
        super({
            ...props,
            InputAvatar: new InputElement({
                name: 'change',
                label: 'Выберите изображение',
                type: 'file',
                required: true,
            }),
            ButtonClose: new ButtonElement({
                label: 'Отмена',
                icon: "arrow_back",
                onClick: props.onCancel,
            })
        });
    }
    init() {
        const onSaveAvatarBind = this.onSaveAvatar.bind(this);

        const ButtonChange = new ButtonElement({
            label: 'Поменять аватар',
            onClick: onSaveAvatarBind,
            icon: "save",
        });

        this.children = {
            ...this.children,
            ButtonChange,
        }
    }

    onSaveAvatar(e: Event) {
        e.preventDefault()
        const input = this.children.InputAvatar as Block;
        const file = input.getValue('file') as File;
        if (file) {
            usersService.changeAvatar(file);
            this.setProps({changeAvatarError: ''});
            this.props.onCancel(e);
        } else {
            this.setProps({changeAvatarError: 'Выберите изображение'});
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        return true;
    }

    render() {
        return `
            <div class="${styles.module}">
                <form class="${styles.inputModule}">
                    <h3>Измнение аватарки</h3>
                    <div class="${styles.input}">
                        {{{ InputAvatar }}}
                    </div>
                    <div class="${styles.error}">
                        {{#if changeAvatarError }}
                            {{ changeAvatarError }}
                        {{/if }}
                    </div>
                    <div class="${styles.actions}">
                        {{{ ButtonChange }}}
                        {{{ ButtonClose }}}
                    </div>
                </form>
            </div>
        `
    }
}

interface StateInterface {
    changeAvatarError: string,
}
const mapStateToProps = (state: StateInterface) => {
    return {
        changeAvatarError: state.changeAvatarError,
    }
}

export default connect(mapStateToProps)(ChangeAvatar as unknown as new (newProps: Props) => Block<Props>);
