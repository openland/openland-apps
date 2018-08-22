
import * as React from 'react';
import Glamorous from 'glamorous';
import Image from './components/icons/messenger-empty.svg';

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
    borderRadius: '100%',
    width: '90%',
    height: '90%',
    position: 'absolute',
    top: '5%',
    left: '5%',
    opacity: 0.1,
    backgroundImage: 'linear-gradient(to bottom, rgba(236, 242, 252, 0), rgba(195, 215, 248, 0.1))',
    zIndex: 0
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 64,
    alignSelf: 'center',
    zIndex: 1
});

export class MessengerEmptyComponent extends React.Component {
    render() {
        return (
            <Root>
                <Reactangle />
                <ImageWrapper>
                    <Image />
                </ImageWrapper>
            </Root>
        );
    }
}