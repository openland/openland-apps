import * as React from 'react';
import { withChatsAll } from '../../api/withChatsAll';
import { makeNavigable } from 'openland-x/Navigable';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x-format/XDate';

const ItemContainer = Glamorous.a({
    display: 'flex',
    height: 64,
    fontSize: 15,
    fontWeight: 500,
    color: '#334562',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(220, 222, 228, 0.45)',
    // borderBottomStyle: 'solid',
    alignItems: 'center',
    '&.is-active': {
        backgroundColor: '#f2f4f5'
    }
});

const Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 12,
    flexGrow: 1,
    alignItems: 'stretch',
    maxWidth: 'calc(100% - 40px)'
});

const Main = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    height: 18
});

const Title = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    fontSize: 14,
    lineHeight: 1.23,
    height: 20,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

const Date = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    fontSize: 12,
    lineHeight: 1.33,
    letterSpacing: -0.1,
    color: '#334562',
    opacity: 0.3
});

const Content = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& .counter': {
        minWidth: 18,
        height: 18,
        borderRadius: 7,
        fontSize: 12,
        border: 'none',
        backgroundColor: '#654bfa',
    }
});

const ContentText = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexBasis: '0px',
    fontSize: 14,
    lineHeight: 1.23,
    opacity: 0.5,
    color: '#334562',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& > span': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
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
                                <Title><span>{v.title}</span></Title>
                                <Date><XDate value={v.topMessage!!.date} format="humanize" /></Date>
                            </Main>
                            <Content>
                                <ContentText>
                                    {v.topMessage && v.topMessage.message && (
                                        <span>{v.topMessage.sender.firstName}: {v.topMessage.message}</span>
                                    )}
                                    {v.topMessage && !v.topMessage.message && (
                                        <span>{v.topMessage.sender.firstName}: File</span>
                                    )}
                                </ContentText>
                                {v.unreadCount > 0 && <XCounter count={v.unreadCount} />}
                            </Content>
                        </Header>
                    </Item>
                ))}
            </XVertical>
        </XScrollView>
    );
});