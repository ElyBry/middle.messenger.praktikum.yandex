import Block from "../../core/Block.ts";

interface LinkProps {
    text?: string;
    class?: string,
    href?: string,
    onClick?: () => void,
    iconName?: string,
    attrs?: string,
    inner?: Handlebars.SafeString | string,
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    if (props.onClick) {
                        props.onClick();
                    }
                },
            },
            inner: props.inner,
        });
    }
    render() {
        return `
            <a class="{{ class }}" href={{ href }} "{{ attrs }}">
                {{ text }} {{> Icon name=iconName}}
                {{{ inner }}}
            </a>
        `
    }
}
