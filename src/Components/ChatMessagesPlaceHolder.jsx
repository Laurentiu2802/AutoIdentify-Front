const MessageReceived = (props) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text}
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    const uniqueMessages = [];
    const messageIds = new Set();

    props.messagesReceived.forEach((message) => {
        if (!messageIds.has(message.id)) {
            messageIds.add(message.id);
            uniqueMessages.push(message);
        }
    });

    return (
        <>
            <h2>Messages:</h2>
            {uniqueMessages.map(message => (
                <MessageReceived key={message.id} from={message.from} text={message.text} />
            ))}
        </>
    );
}

export default ChatMessagesPlaceholder;