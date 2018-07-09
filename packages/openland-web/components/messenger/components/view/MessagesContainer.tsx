import * as React from 'react';
import Glamorous from 'glamorous';

let MessagesContainerInner = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    // flexBasis: '0px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    position: 'relative',
    maxHeight: '100%',
    maxWidth: 900,
    width: '100%',
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
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    // height: 'calc(100% - 80px)',
    // maxHeight: 'calc(100% - 80px)',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
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