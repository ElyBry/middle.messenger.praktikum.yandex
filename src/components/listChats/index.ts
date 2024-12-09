import styles from './listChats.module.scss';
import Block from "../../core/Block.ts";
import { Chats } from "../chats";

interface ChatProps {
    id: number,
    name: string,
    lastMessage: string,
    time: string,
    isOnline: boolean,
    avatar: string,
    isTyping: boolean,
    setProps?: ({  }) => void,
    props?: {id: number},
}
type ChatsProps = ChatProps[];

interface ListElementProps {
    chatsList: ChatsProps,
    onClick?: (event: FocusEvent) => void,
}

export class ListChats extends Block {
    constructor(props: ListElementProps) {
        super({
            ...props,
            Chats: props.chatsList.map(
                (chatProps) =>
                    new Chats({
                        ...chatProps,
                        onClick: () => {
                            this.setProps({ openChatId: chatProps.id });
                            this.setProps({ openChat: true});
                        },
                    }),
            ),
        });
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
