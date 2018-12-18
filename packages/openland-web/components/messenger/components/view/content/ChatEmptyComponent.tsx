import * as React from 'react';
import Glamorous from 'glamorous';
import { SharedRoomKind } from 'openland-api/Types';
import { XView } from 'react-mental';

const Image = Glamorous.div<{ isRoom: boolean }>(props => ({
    width: props.isRoom ? 434 : 391,
    height: props.isRoom ? 352 : 380,
    backgroundImage: props.isRoom
        ? "url('/static/X/messenger/chat-channel-empty.svg')"
        : "url('/static/X/messenger/chat-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
}));

const Text = (props: { children: any }) => {
    return (
        <XView
            fontSize={16}
            fontWeight="400"
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
};

export const EmptyBlock = (props: {
    conversationType?: SharedRoomKind | 'PRIVATE';
    onClick?: (show: boolean) => void;
}) => (
    <XView position="relative" alignItems="center" justifyContent="center" marginTop={-100}>
        <XView zIndex={1} justifyContent="center" alignItems="center">
            <XView alignItems="center" justifyContent="center" marginTop={64}>
                <Image isRoom={props.conversationType === 'PUBLIC'} />
            </XView>
            {props.conversationType === 'PUBLIC' && <Text>The discussion hasn’t started yet</Text>}
            {props.conversationType !== 'PUBLIC' && <Text>No messages yet</Text>}
        </XView>
    </XView>
);
