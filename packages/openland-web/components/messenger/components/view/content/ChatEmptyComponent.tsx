import * as ReactDOM from 'react-dom';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import EmptyChatImg from '../../icons/chat-empty.svg';
import EmptyChatImgChannel from '../../icons/chat-channel-empty.svg';

const EmptyRoot = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    borderRadius: '100%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '10%',
    left: '0%',
    opacity: 0.1,
    backgroundImage: 'linear-gradient(21deg, #ecf2fc, #b9cff7)',
    zIndex: 0
});

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
                {props.conversationType === 'ChannelConversation' ? <EmptyChatImgChannel /> : <EmptyChatImg />}
            </ImageWrapper>
            {props.conversationType === 'ChannelConversation' && (
                <>
                    <TextSmall>The discussion hasn’t started yet</TextSmall>
                    <Text
                        marginTop={8}
                        opacity={1}
                        marginBottom={30}
                    >
                        To get things going, describe what you are looking for and how you can help others
                    </Text>
                    <XButton
                        text="Write to channel"
                        style="primary-sky-blue"
                        size="r-default"
                        onClick={() => props.onClick ? props.onClick(true) : null}
                    />
                </>
            )}
            {props.conversationType !== 'ChannelConversation' && <Text opacity={0.5} marginTop={8}>No messages yet</Text>}
        </EmptyContent>
    </EmptyRoot>
);