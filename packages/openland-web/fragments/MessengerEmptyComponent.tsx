import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';

export class MessengerEmptyComponent extends React.Component {
    render() {
        return (
            <XView
                position="relative"
                flexDirection="column"
                justifyContent="center"
                minWidth="100%"
                height="100%"
                paddingTop={28}
                paddingLeft={28}
                paddingBottom={28}
                paddingRight={28}
                flexShrink={0}
            >
                <XView
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    alignSelf="center"
                    zIndex={1}
                >
                    <XView
                        as="img"
                        width={358}
                        height={311}
                        src="/static/X/messenger/messenger-empty.svg"
                        marginBottom={50}
                    />
                    <XView
                        fontSize={16}
                        lineHeight="24px"
                        color="rgba(0, 0, 0, 0.4)"
                        marginBottom={32}
                    >
                        Select a chat or start a new one
                    </XView>
                    <XButton style="primary" text="New chat" path="/mail/new" />
                </XView>
            </XView>
        );
    }
}
