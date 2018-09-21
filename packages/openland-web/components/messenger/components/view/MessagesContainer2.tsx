import * as React from 'react';
import Glamorous from 'glamorous';

const ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden'
});

const MessagesContainerInner = Glamorous.div({
    display: 'flex',
    flexGrow: 1,
    flexBasis: '100%',
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    '& .ReactVirtualized__Grid.ReactVirtualized__List': {
        paddingBottom: 40
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