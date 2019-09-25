import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css } from 'linaria';

const textWrapper = css`
    text-align: center;
`;

interface MessengerEmptyFragmentProps {
    text?: string;
}

export const MessengerEmptyFragment = React.memo((props: MessengerEmptyFragmentProps) => {
    const { text } = props;

    return (
        <XView
            position="relative"
            flexDirection="column"
            justifyContent="center"
            width="100%"
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
                    src="/static/X/messenger/messenger-empty.svg"
                    marginBottom={50}
                    maxWidth="100%"
                />
                <XView fontSize={16} lineHeight="24px" color="rgba(0, 0, 0, 0.4)" marginBottom={32}>
                    <span className={textWrapper}>
                        {text || 'Select a chat to start messaging'}
                    </span>
                </XView>
            </XView>
        </XView>
    );
});
