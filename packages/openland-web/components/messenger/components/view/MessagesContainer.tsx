import * as React from 'react';
import Glamorous from 'glamorous';

const ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '0px',
    alignSelf: 'stretch',
    // width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden'
});

const MessagesContainerInner = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexBasis: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'relative',
    maxHeight: '100%',
    height: '100%',
    maxWidth: 900,
    width: '100%',
    overflow: 'hidden',
    '& > div:first-child': {
        width: '100%',
        maxWidth: '100%',
        flexBasis: '100%',
        '& > .simplebar-scroll-content > .simplebar-content': {
            overflowX: 'unset !important',
            overflowY: 'unset !important',
            width: '100%',
            justifyContent: 'flex-end'
        }
    }
});

export const MessagesContainer = (props: { children?: any }) => {
    return (
        <ChatContainer>
            <MessagesContainerInner>
                {props.children}
            </MessagesContainerInner>
        </ChatContainer>
    );
};