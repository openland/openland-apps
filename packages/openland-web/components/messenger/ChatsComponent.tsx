import * as React from 'react';
import { withChatsAll } from '../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';

let ItemContainer = Glamorous.a({
    display: 'flex',
    height: '64px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#334562',
    flexDirection: 'row',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderBottomWidth: '1px',
    borderBottomColor: 'rgba(220, 222, 228, 0.45)',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    '&.is-active': {
        backgroundColor: '#ebedf0'
    }
});

let Main = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '8px',
    flexGrow: 1,
    alignItems: 'center'
});

let Title = Glamorous.div({
    display: 'flex',
    flexGrow: 1
});

let Item = makeNavigable((props) => {
    return <ItemContainer href={props.href} target={props.hrefTarget} onClick={props.onClick} className={props.active ? 'is-active' : undefined}> {props.children}</ItemContainer >;
});

export const ChatsComponent = withChatsAll((props) => {
    return (
        <XScrollView>
            <XVertical separator={'none'}>
                {props.data && props.data.chats && props.data.chats.conversations.map((v) => (
                    <Item path={'/mail/' + v.id}>
                        <XAvatar style={v.__typename === 'SharedConversation' ? 'organization' : 'person'} />
                        <Main>
                            <Title>{v.title}</Title>
                            {v.unreadCount > 0 && <XCounter count={v.unreadCount} />}
                        </Main>
                    </Item>
                ))}
            </XVertical>
        </XScrollView>
    );
});