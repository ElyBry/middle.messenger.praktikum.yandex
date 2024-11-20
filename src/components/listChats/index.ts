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
            openChatId: 1,
            Chats: props.chatsList.map(
                (chatProps) =>
                    new Chats({
                        ...chatProps,
                        onClick: () => {
                            this.setProps({ openChatId: chatProps.id });
                        },
                    }),
            ),
        });
    }



    render() {
        // const { openChatId } = this.props;
        // const chats: ChatsProps = this.children.Chats;
        //
        console.log(this.children);
        //
        // if (!chats) {
        //     return `
        //         <div class="${styles.listChats}">
        //             Чатов не найдено(
        //         </div>
        //     `
        // }
        // chats.forEach((chat : ChatProps) => {
        //     chat.setProps({ active: chat.props.id === openChatId });
        // });

        const childrenArray = Object.values(this.children);

        return `
            <div class="${styles.listChats}">
                {{childrenArray}}
                {{#each childrenArray }}
                    {{{ this }}}
                {{/each}}
            </div>
        `
    }
}
