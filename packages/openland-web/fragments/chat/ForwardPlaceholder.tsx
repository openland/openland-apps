import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessagesStateContextProps } from '../../components/messenger/MessagesStateContext';
import CloseIcon from 'openland-icons/ic-close-post.svg';

const ForwardRoot = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
    height: 'calc(100% + 55px)',
    padding: 28,
    paddingTop: 0,
    flexShrink: 0,
    left: 0,
    top: -55,
    zIndex: 2,
    backgroundColor: '#fff',
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1,
});

const Image = Glamorous.div({
    width: 358,
    height: 311,
    backgroundImage: "url('/static/X/messenger/messenger-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    transform: 'scaleX(-1)',
    marginBottom: 50,
});

const InfoTextBold = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)',
});

const InfoText = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    '& span': {
        fontWeight: 600,
        color: '#4C4C4C',
    },
});

export const ForwardPlaceholder = (props: { state: MessagesStateContextProps }) => {
    let { state } = props;
    let msgLength = 0;
    if (state.forwardMessagesId) {
        msgLength = state.forwardMessagesId.size;
    }

    return (
        <ForwardRoot>
            <XView
                onClick={() => {
                    state.resetAll();
                }}
                width={32}
                height={32}
                borderRadius={50}
                paddingHorizontal={8}
                paddingVertical={8}
                position="absolute"
                right={20}
                top={20}
                cursor="pointer"
                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <CloseIcon />
            </XView>
            <ImageWrapper>
                <Image />
                <XVertical separator={6} alignItems="center">
                    <InfoTextBold>Forwarding messages</InfoTextBold>
                    <InfoText>
                        Select a chat in the left column to forward{' '}
                        <span>
                            {msgLength} {msgLength === 1 ? 'message' : 'messages'}
                        </span>
                    </InfoText>
                </XVertical>
            </ImageWrapper>
        </ForwardRoot>
    );
};
