import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { XMemo } from 'openland-y-utils/XMemo';

export const MessengerEmptyFragment = XMemo((props: { text?: string }) => {
    return (
        <XView
            position="relative"
            flexDirection="column"
            justifyContent="center"
            minWidth="100%"
            height="100%"
            flexGrow={1}
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
                <XImage
                    width={358}
                    height={311}
                    src="/static/X/messenger/messenger-empty.svg"
                    marginBottom={50}
                />
                <XView fontSize={16} lineHeight="24px" color="rgba(0, 0, 0, 0.4)" marginBottom={32}>
                    {props.text ? props.text : 'Select a chat to start messaging'}
                </XView>
            </XView>
        </XView>
    );
});
