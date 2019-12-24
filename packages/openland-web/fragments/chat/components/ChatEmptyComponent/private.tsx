import React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';
import { TextTitle1, TextBody, TextLabel2 } from 'openland-web/utils/TextStyles';

interface MessageProps {
    children: string | string[];
    sendMessage: (message: string) => void;
}

const createMessage = (message: string | string[]) => message instanceof Array ? message.join('') : message;

const Message = React.memo((props: MessageProps) => (
    <XView
        backgroundColor="var(--backgroundTertiary)"
        cursor="pointer"
        onClick={() => props.sendMessage(createMessage(props.children))}
        paddingLeft={16}
        paddingRight={16}
        paddingTop={7}
        paddingBottom={7}
        borderRadius={18}
        margin={8}
        color="var(--foregroundSecondary)"
    >
        <span className={TextLabel2}>{props.children}</span>
    </XView>
));

interface ChatEmptyComponentPrivateProps {
    conversation: ConversationEngine;
}

export default React.memo((props: ChatEmptyComponentPrivateProps) => {
    const userName = props.conversation.user!.firstName;
    const sendMessage = (text: string) => props.conversation.sendMessage(text, null);

    return (
        <XView width="100%" height="100%" alignItems="center" justifyContent="center">
            <img
                width="320"
                height="200"
                src="//cdn.openland.com/shared/art/art-no-messages.png"
                srcSet="//cdn.openland.com/shared/art/art-no-messages@2x.png 2x, //cdn.openland.com/shared/art/art-no-messages@3x.png 3x"
                alt=""
            />
            <XView marginTop={6}>
                <h2 className={TextTitle1}>No messages yet</h2>
            </XView>
            <XView marginTop={8} color="var(--foregroundSecondary)">
                <p className={TextBody}>Start a conversation with {userName}</p>
            </XView>
            <XView
                marginTop={24}
                justifyContent="center"
                flexDirection="row"
                flexWrap="wrap"
                maxWidth={400}
            >
                <Message sendMessage={sendMessage}>👋</Message>
                <Message sendMessage={sendMessage}>Hello, {userName}!</Message>
                <Message sendMessage={sendMessage}>Happy to connect!</Message>
                <Message sendMessage={sendMessage}>What are you working on?</Message>
                <Message sendMessage={sendMessage}>How can I help?</Message>
            </XView>
        </XView>
    );
});
