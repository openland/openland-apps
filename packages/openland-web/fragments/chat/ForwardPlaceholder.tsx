import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import { plural } from 'openland-y-utils/plural';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const imageStyle = css`
    width: 358px;
    height: 311px;
    background-image: url('/static/X/messenger/messenger-empty.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transform: scaleX(-1);
    margin-bottom: 50px;
`;

export const ForwardPlaceholder = (props: { chatId: string }) => {
    let engine = React.useContext(MessengerContext).getConversation(props.chatId).messagesActionsState;
    let state = engine.useState();

    if (state.action !== 'forwardInit') {
        return null;
    }

    return (
        <XView
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            width="100%"
            height="100%"
        >
            <XView
                onClick={engine.clear}
                width={32}
                height={32}
                borderRadius={50}
                paddingHorizontal={8}
                paddingVertical={8}
                position="absolute"
                right={20}
                top={20}
                cursor="pointer"
                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <CloseIcon />
            </XView>
            <XView
                flexDirection="column"
                alignSelf="center"
                alignItems="center"
                justifyContent="center"
            >
                <div className={imageStyle} />
                <XView flexDirection="column" alignItems="center">
                    <XView
                        marginBottom={12}
                        fontSize={18}
                        fontWeight="600"
                        lineHeight={1.11}
                        color="rgba(0, 0, 0, 0.9)"
                    >
                        Forwarding messages
                    </XView>
                    <XView
                        fontSize={16}
                        lineHeight="24px"
                        color="rgba(0, 0, 0, 0.4)"
                        flexDirection="row"
                    >
                        Select a chat in the left column to forward
                        <XView fontWeight="600" color="#4C4C4C" marginLeft={5}>
                            {state.messages.length} {plural(state.messages.length, ['message', 'messages'])}
                        </XView>
                    </XView>
                </XView>
            </XView>
        </XView>
    );
};
