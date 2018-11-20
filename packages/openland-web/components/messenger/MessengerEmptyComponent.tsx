
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
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 32
});

export class MessengerEmptyComponent extends React.Component {
    render() {
        return (
            <Root>
                <ImageWrapper>
                    <Image />
                    <InfoText>Select a chat or start a new one</InfoText>
                    <XButton
                        style="primary"
                        text="New chat"
                        path="/mail/new"
                    />
                </ImageWrapper>
            </Root>
        );
    }
}