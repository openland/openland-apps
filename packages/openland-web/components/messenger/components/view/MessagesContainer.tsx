import * as React from 'react';
import Glamorous from 'glamorous';

let MessagesContainerInner = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    // flexBasis: '0px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    maxHeight: '100%',
    overflow: 'hidden',
    '& > div:first-child': {
        width: '100%',
        maxWidth: '100%',
        '& > .simplebar-scroll-content > .simplebar-content': {
            overflowX: 'unset !important',
            overflowY: 'unset !important',
            width: '100%'
        }
    }
});

let ChatContainer = Glamorous.div({
    display: 'flex',
    // flexBasis: '0px',
    height: 'calc(100% - 96px)',
    maxHeight: 'calc(100% - 96px)',
    flexGrow: 1,
    flexDirection: 'column',
    maxWidth: 900,
    margin: 'auto',
    width: '100%'
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