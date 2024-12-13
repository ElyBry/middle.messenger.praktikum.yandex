import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import {UserDTOResponse} from "../../api/type.ts";
import {Avatar} from "../index.ts";

interface UserProps {
    user: UserDTOResponse;
    active: boolean,
    onClick: (event: FocusEvent) => void,
}

class User extends Block{
    constructor(props: UserProps) {
        super({
            ...props,
            user: props.user,
            Avatar: new Avatar({
                img: props.user.avatar,
                height: 65,
                width: 65,
            }),
            events: {
                click: props.onClick,
            }
        });
    }

    render() {
        const name = this.props.user.first_name + " " + this.props.user.second_name;
        const display_name = this.props.user.display_name || '';
        return `
            <div class="${styles.main} {{#if active}} ${styles.active} {{/if}}">
                <div class="${styles.avatar}">
                    {{{ Avatar }}}
                </div>
                <div class="${styles.name}">
                    <div>
                        ${display_name}
                    </div>
                    <div>
                        ${name}
                    </div>
                </div>
            </div>
        `
    }
}


export default User;
