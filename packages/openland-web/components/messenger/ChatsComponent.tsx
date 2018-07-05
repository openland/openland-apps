import * as React from 'react';
import { withChatsAll } from '../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';

let ItemContainer = Glamorous.a({
    fontSize: '15px',
    color: '#fff'
});

let Item = makeNavigable((props) => {
    return <ItemContainer href={props.href} target={props.hrefTarget} onClick={props.onClick}>{props.children}</ItemContainer>;
});

export const ChatsComponent = withChatsAll((props) => {
    return (
        <XVertical>
            {props.data && props.data.chats && props.data.chats.conversations.map((v) => (<Item path={'/mail/' + v.id}>{v.title} {v.unreadCount > 0 && <XCounter count={v.unreadCount} />} </Item>))}
        </XVertical>
    );
});