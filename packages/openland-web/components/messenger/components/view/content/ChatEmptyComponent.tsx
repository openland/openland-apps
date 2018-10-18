import * as React from 'react';
import Glamorous from 'glamorous';

const EmptyRoot = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100
});

const EmptyContent = Glamorous.div({
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
});

const Image = Glamorous.div<{ isChannel: boolean }>(props => ({
    width: props.isChannel ? 434 : 391,
    height: props.isChannel ? 352 :  380,
    backgroundImage: props.isChannel
        ? 'url(\'/static/X/messenger/chat-channel-empty.svg\')'
        : 'url(\'/static/X/messenger/chat-empty.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
}));

const ImageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 64,
    alignSelf: 'center'
});

const Text = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    maxWidth: 430,
    textAlign: 'center',
    marginTop: 8,
});

export const EmptyBlock = (props: { conversationType?: string, onClick?: (show: boolean) => void }) => (
    <EmptyRoot>
        <EmptyContent>
            <ImageWrapper>
                {props.conversationType === 'ChannelConversation' ? <Image isChannel={true} /> : <Image isChannel={false} />}
            </ImageWrapper>
            {props.conversationType === 'ChannelConversation' && <Text>The discussion hasn’t started yet</Text>}
            {props.conversationType !== 'ChannelConversation' && <Text>No messages yet</Text>}
        </EmptyContent>
    </EmptyRoot>
);