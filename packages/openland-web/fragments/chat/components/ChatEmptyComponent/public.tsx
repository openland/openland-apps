import React from 'react';
import { XView, XImage } from 'react-mental';

export default React.memo(() => (
    <XView position="relative" alignItems="center" justifyContent="center" flexGrow={1}>
        <XView zIndex={1} justifyContent="center" alignItems="center">
            <XView alignItems="center" justifyContent="center">
                <XImage width={434} height={352} src="/static/X/messenger/chat-channel-empty.svg" />
            </XView>
            <XView
                fontSize={16}
                lineHeight="24px"
                color="rgba(0, 0, 0, 0.4)"
                maxWidth={430}
                alignItems="center"
                justifyContent="center"
                marginTop={8}
            >
                The discussion hasn’t started yet
            </XView>
        </XView>
    </XView>
));
