import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';

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

const Reactangle = Glamorous.div({
    width: '100%',
    height: 600,
    position: 'absolute',
    top: 'calc(50% - 300px)',
    left: 0,
    backgroundImage: 'url(\'/static/X/messenger/reactangle.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    zIndex: 0,
    pointerEvents: 'none'
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

const Text = Glamorous.div<{ opacity: number, marginTop: number, marginBottom?: number }>(props => ({
    opacity: props.opacity,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.2,
    color: '#334562',
    maxWidth: 430,
    textAlign: 'center',
    marginTop: props.marginTop,
    marginBottom: props.marginBottom
}));

const TextSmall = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.2,
    color: '#5c6a81'
});

export const EmptyBlock = (props: { conversationType?: string, onClick?: (show: boolean) => void }) => (
    <EmptyRoot>
        <Reactangle />
        <EmptyContent>
            <ImageWrapper>
                {props.conversationType === 'ChannelConversation' ? <Image isChannel={true} /> : <Image isChannel={false} />}
            </ImageWrapper>
            {props.conversationType === 'ChannelConversation' && <Text opacity={0.5} marginTop={8}>The discussion hasn’t started yet</Text>}
            {props.conversationType !== 'ChannelConversation' && <Text opacity={0.5} marginTop={8}>No messages yet</Text>}
        </EmptyContent>
    </EmptyRoot>
);