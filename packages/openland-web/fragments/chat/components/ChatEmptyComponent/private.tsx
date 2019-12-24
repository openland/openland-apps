import React from 'react';
import { XView } from 'react-mental';
import { TextTitle1, TextBody, TextLabel2 } from 'openland-web/utils/TextStyles';

interface ChatEmptyComponentPrivateProps {
    username: string;
    sendMessage: (message: string) => void;
}

interface MessageProps {
    children: string;
    sendMessage: (message: string) => void;
}

const Message = React.memo((props: MessageProps) => (
    <XView
        backgroundColor="var(--backgroundTertiary)"
        cursor="pointer"
        onClick={() => props.sendMessage(props.children)}
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

export default React.memo(() => {
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
                <p className={TextBody}>Start a conversation with Yury</p>
            </XView>
            <XView
                marginTop={24}
                justifyContent="center"
                flexDirection="row"
                flexWrap="wrap"
                maxWidth={400}
            >
                <Message sendMessage={console.log}>👋</Message>
                <Message sendMessage={console.log}>Hello, Yury!</Message>
                <Message sendMessage={console.log}>Happy to connect!</Message>
                <Message sendMessage={console.log}>What are you working on?</Message>
                <Message sendMessage={console.log}>How can I help?</Message>
            </XView>
        </XView>
    );
});
