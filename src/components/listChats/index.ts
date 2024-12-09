import styles from './listChats.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {ChatProps} from "../chats";
import {Chats} from "../index.ts";

type ChatsProps = ChatProps[];

interface ListElementProps {
    chatsList: ChatsProps,
    onClick?: (event: FocusEvent) => void,
    onSelectChat?: (event: number) => void,
}

export class ListChats extends Block {
    constructor(props: ListElementProps) {
        super({
            ...props,
            openChatId: -1,
            openChat: false,
            Chats: props.chatsList.map(
                (chatProps: ChatProps) =>
                    new Chats({
                        ...chatProps,
                        id: chatProps.id,
                        title: chatProps.title,
                        onClick: () => {
                            this.props.onSelectChat(chatProps.id);
                            this.setProps({ openChatId: chatProps.id });
                            this.setProps({ openChat: true});
                        },
                    }),
            ),
        });
    }

    componentDidUpdate(oldProps?: Props, newProps?: Props): boolean {
        if (oldProps === newProps) {
            return false;
        }

        if (newProps && newProps.chats) {
            this.children.Chats = newProps.chats.map(
                (chatProps: any) =>
                    new Chats({
                        ...chatProps,
                        onClick: () => {
                            this.props.onSelectChat(chatProps.id);
                            this.setProps({ openChatId: chatProps.id });
                            this.setProps({ openChat: true});
                        },
                    }),
            )
        }

        return true;
    }

    render() {
        const { openChatId } = this.props;
        const { Chats } = this.children;

        if (!Chats) {
            return `
                <div class="${styles.listChats}">
                    Чатов не найдено(
                </div>
            `
        }
        if (!Array.isArray(Chats)) {
            throw new Error(`Chats должен являтсья массивом`);
        }
        Chats.forEach((chat : Block) => {
            chat.setProps({ active: chat.props.id === openChatId });
        });

        return `
            <div class="${styles.listChats}">
                {{#each Chats }}
                    {{{ this }}}
                {{/each}}
            </div>
        `
    }
}
