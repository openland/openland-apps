import React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { css, cx } from 'linaria';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface MessageProps {
    children: string | string[];
    sendMessage: (message: string) => void;
}

const createMessage = (message: string | string[]) => message instanceof Array ? message.join('') : message;
// specs
const trimUserName = (name: string) => name.length > 20 ? name.slice(0, 17) + '...' : name;

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

const subtitle = css`
    text-align: center;
`;

export const PrivatePlaceholder = React.memo((props: ChatEmptyComponentPrivateProps) => {
    const userName = props.conversation.user!.firstName;
    const canSendMessage = props.conversation.canSendMessage;
    const sendMessage = (text: string) => props.conversation.sendMessage(text, null, undefined);
    const layout = useLayout();
    const messenger = React.useContext(MessengerContext);
    const isSavedMessages = messenger.user.id === props.conversation.user!.id;

    return (
        <div className={wrapper}>
            <XView flexDirection="column" alignItems="center" justifyContent="center">
                {canSendMessage ? (
                    <>
                        <img
                            width="320"
                            height="200"
                            src="//cdn.openland.com/shared/art/art-no-messages.png"
                            srcSet="//cdn.openland.com/shared/art/art-no-messages@2x.png 2x, //cdn.openland.com/shared/art/art-no-messages@3x.png 3x"
                            alt=""
                        />
                        <XView marginTop={16} color="var(--foregroundPrimary)">
                            <h2 className={TextTitle1}>No messages yet</h2>
                        </XView>
                        {!isSavedMessages && (
                            <>
                                <XView marginTop={8} color="var(--foregroundSecondary)">
                                    <p className={cx(TextBody, subtitle)}>Start a conversation with {userName}</p>
                                </XView>
                                <XView
                                    marginTop={24}
                                    justifyContent="center"
                                    flexDirection="row"
                                    flexWrap="wrap"
                                    maxWidth={layout !== 'mobile' ? 400 : 200}
                                >
                                    <Message sendMessage={sendMessage}>👋</Message>
                                    <Message sendMessage={sendMessage}>Hello, {trimUserName(userName)}!</Message>
                                    <Message sendMessage={sendMessage}>Happy to connect!</Message>
                                    {layout !== 'mobile' && <Message sendMessage={sendMessage}>What are you working on?</Message>}
                                    {layout !== 'mobile' && <Message sendMessage={sendMessage}>How can I help?</Message>}
                                </XView>
                            </>
                        )}
                    </>
                ) : (
                        <XView color="var(--foregroundSecondary)">
                            <p className={TextBody}>No messages yet</p>
                        </XView>
                    )}
            </XView>
        </div>
    );
});
