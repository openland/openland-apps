import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { XMemo } from 'openland-y-utils/XMemo';
import { XButton } from 'openland-x/XButton';

export const MessengerWrongFragment = XMemo(() => {
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
                    width={378}
                    height={248}
                    src="/static/X/illustration-error.png"
                    srcSet="/static/X/illustration-error@2x.png 2x"
                    marginBottom={70}
                    flexShrink={0}
                />
                <XView fontSize={24} fontWeight="600" marginBottom={12}>
                    Cannot view group
                </XView>
                <XView fontSize={16} lineHeight="24px" color="rgba(0, 0, 0, 0.4)" marginBottom={28}>
                    This group doesn't exist or you don't have permission to view it
                </XView>
                <XButton style="primary" text="Go back" path="/mail" />
            </XView>
        </XView>
    );
});
