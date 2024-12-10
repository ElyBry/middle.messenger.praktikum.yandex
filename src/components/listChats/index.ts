import styles from './index.module.scss';
import Block, {Props} from "../../core/Block.ts";
import {ChatProps} from "../chats";
import {Chats} from "../index.ts";
import {connect} from "../../utils/Connect.ts";

type ChatsProps = ChatProps[];

interface ListElementProps {
    chatsList: ChatsProps,
    onSelectChat?: (event: { }) => void,
}

class ListChats extends Block {
    constructor(props: ListElementProps) {
        super({
            ...props,
            openChatId: -1,
            Chats: props.chatsList.map(
                (chatProps: ChatProps) =>
                    new Chats({
                        ...chatProps,
                        id: chatProps.id,
                        title: chatProps.title,
                        onClick: () => {
                            if (props.onSelectChat) {
                                props.onSelectChat(chatProps)
                            }
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
                            if (this.props.onSelectChat) {
                                this.props.onSelectChat(chatProps)
                            }
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
interface StateInterface {
    chats: {}
}
const mapStateToProps = (state: StateInterface) => {
    return {
        chats: state.chats,
    }
}

export default connect(mapStateToProps)(ListChats as unknown as new (newProps: Props) => Block<Props>);
