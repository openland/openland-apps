import * as React from 'react';
import { SharedRoomKind } from 'openland-api/Types';
import { XView } from 'react-mental';

const ImagePrivate = () => (
    <XView as="img" width={391} height={380} src="/static/X/messenger/chat-empty.svg" />
);

const ImageRoom = () => (
    <XView as="img" width={434} height={352} src="/static/X/messenger/chat-channel-empty.svg" />
);

const Text = (props: { children: any }) => (
    <XView
        fontSize={16}
        lineHeight="24px"
        color="rgba(0, 0, 0, 0.4)"
        maxWidth={430}
        alignItems="center"
        justifyContent="center"
        marginTop={8}
    >
        {props.children}
    </XView>
);

interface EmptyBlockProps {
    conversationType?: SharedRoomKind | 'PRIVATE';

    onClick?: (show: boolean) => void;
}

export const EmptyBlock = (props: EmptyBlockProps) => (
    <XView position="relative" alignItems="center" justifyContent="center" marginTop={-100}>
        <XView zIndex={1} justifyContent="center" alignItems="center">
            <XView alignItems="center" justifyContent="center" marginTop={64}>
                {props.conversationType === 'PUBLIC' && <ImageRoom />}
                {props.conversationType !== 'PUBLIC' && <ImagePrivate />}
            </XView>
            {props.conversationType === 'PUBLIC' && <Text>The discussion hasn’t started yet</Text>}
            {props.conversationType !== 'PUBLIC' && <Text>No messages yet</Text>}
        </XView>
    </XView>
);
