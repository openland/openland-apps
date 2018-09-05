
import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';

const Root = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100%',
    padding: 28,
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

const ImageWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1
});

const Image = Glamorous.div({
    width: 358,
    height: 311,
    backgroundImage: 'url(\'/static/X/messenger/messenger-empty.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    marginBottom: 50
});

const InfoText = Glamorous.div({
    opacity: 0.5,
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.4,
    color: '#334562',
    marginBottom: 32
});

export class MessengerEmptyComponent extends React.Component {
    render() {
        return (
            <Root>
                <Reactangle />
                <ImageWrapper>
                    <Image />
                    <InfoText>Select a chat or start a new one</InfoText>
                    <XButton
                        size="r-default"
                        style="primary-sky-blue"
                        text="New chat"
                        path="/mail/new"
                    />
                </ImageWrapper>
            </Root>
        );
    }
}