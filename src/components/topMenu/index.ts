import styles from './index.module.scss';
import Block from "../../core/Block.ts";
import Avatar from "../avatar";
import {withRouter} from "../../routing/WithRouter.ts";

interface TopMenuProps {
    onClick?: () => void,
    link?: boolean,
    class?: string,
    text?: string,
    avatar?: string,
    display_name?: string,
}

class TopMenu extends Block {
    constructor(props: TopMenuProps) {
        super({
            ...props,
            events: {
                click: props.onClick,
            },
            AvatarBlock: new Avatar({
                img: props.avatar || window.store?.getState()?.user?.avatar || '',
            }),
            UserName: props.display_name || '',
            class: props.class || styles.me,
        });
    }


    render() {
        return `
            <a class="{{ class }}">
                <div class="${styles.header}">
                    <div class="${styles.avatar}">
                        {{{ AvatarBlock }}}
                    </div>
                    <div class="${styles.name}">
                        {{ UserName }}
                    </div>
                </div>
            </a>
        `
    }
}

export default withRouter(TopMenu);
