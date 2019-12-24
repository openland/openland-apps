import React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { css } from 'linaria';

interface MessageProps {
    children: string | string[];
    sendMessage: (message: string) => void;
}

const createMessage = (message: string | string[]) => message instanceof Array ? message.join('') : message;

const Message = React.memo((props: MessageProps) => (
    <UButton
        text={createMessage(props.children)}
        margin={8}
        style="secondary"
        onClick={() => props.sendMessage(createMessage(props.children))}
    />
));

interface ChatEmptyComponentPrivateProps {
    conversation: ConversationEngine;
}

const wrapper = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const PrivatePlaceholder = React.memo((props: ChatEmptyComponentPrivateProps) => {
    const userName = props.conversation.user!.firstName;
    const sendMessage = (text: string) => props.conversation.sendMessage(text, null);
    const layout = useLayout();

    return (
        <div className={wrapper}>
            <XView flexDirection="column" alignItems="center" justifyContent="center">
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
                    maxWidth={layout !== 'mobile' ? 400 : 200}
                >
                    <Message sendMessage={sendMessage}>👋</Message>
                    <Message sendMessage={sendMessage}>Hello, {userName}!</Message>
                    <Message sendMessage={sendMessage}>Happy to connect!</Message>
                    {layout !== 'mobile' && <Message sendMessage={sendMessage}>What are you working on?</Message>}
                    {layout !== 'mobile' && <Message sendMessage={sendMessage}>How can I help?</Message>}
                </XView>
            </XView>
        </div>
    );
});
