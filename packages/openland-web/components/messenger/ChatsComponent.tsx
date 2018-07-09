import * as React from 'react';
import { withChatsAll } from '../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x-format/XDate';

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

let Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '8px',
    flexGrow: 1,
    alignItems: 'stretch'
});

let Main = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 1,
    height: '20px'
});

let Title = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    fontSize: '14px',
    lineHeight: '20px',
    height: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

let Date = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0
});

let Content = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

let Item = makeNavigable((props) => {
    return <ItemContainer href={props.href} target={props.hrefTarget} onClick={props.onClick} className={props.active ? 'is-active' : undefined}> {props.children}</ItemContainer >;
});

export const ChatsComponent = withChatsAll((props) => {
    return (
        <XScrollView>
            <XVertical separator={'none'}>
                {props.data && props.data.chats && props.data.chats.conversations.map((v) => (
                    <Item path={'/mail/' + v.flexibleId} key={v.id}>
                        <XAvatar style={v.__typename === 'SharedConversation' ? 'organization' : 'person'} cloudImageUuid={v.photos.length > 0 ? v.photos[0] : undefined} />
                        <Header>
                            <Main>
                                <Title>{v.title}</Title>
                                <Date><XDate value={v.topMessage!!.date} format="humanize" /></Date>
                            </Main>
                            <Content>
                                {v.topMessage && v.topMessage.message && (
                                    <span>{v.topMessage.sender.firstName}: {v.topMessage.message}</span>
                                )}
                                {v.topMessage && !v.topMessage.message && (
                                    <span>{v.topMessage.sender.firstName}: File</span>
                                )}
                                {v.unreadCount > 0 && <XCounter count={v.unreadCount} />}
                            </Content>
                        </Header>
                    </Item>
                ))}
            </XVertical>
        </XScrollView>
    );
});