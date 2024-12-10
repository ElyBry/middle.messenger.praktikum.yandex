

export default function addMessage(messages, newMessage) {
    const newIndex = Object.keys(messages).length;
    console.log(newIndex, messages, newMessage);
    messages[newIndex] = {
        ...newMessage,
    };
    return messages;
}