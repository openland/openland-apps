import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../Incubator/XOverflow';

const ChatRoot = Glamorous(XVertical)({
    width: '100%',
    height: '100%',
});

const ChatWrapper = Glamorous(XHorizontal)({
    width: '100%',
    height: 'calc(100% - 79px)',
    maxHeight: 'calc(100% - 79px)'
});

const ChatHeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    height: 79,
    flexShrink: 0,
    paddingLeft: 40,
    paddingRight: 40,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const ChatHeaderContent = Glamorous(XHorizontal)({
    alignItems: 'center',
    maxWidth: 850,
    width: '100%',
    flexBasis: '100%'
});

const ChatLeftContent = Glamorous(XHorizontal)({
    maxWidth: 'calc(100% - 48px)'
});

const ChatTitleContent = Glamorous(XVertical)({
    maxWidth: 'calc(100% - 70px)'
});

const ChatLogo = Glamorous(XAvatar)({
    width: 50,
    height: 50
});

const Title = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    color: '#334562',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const SubTitle = Glamorous.div({
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: 1.43,
    color: '#334562',
    opacity: 0.5,
    marginTop: 6
});

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    return (
        <ChatRoot flexGrow={1} separator={'none'}>
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <ChatLeftContent separator={10} alignItems="center" flexGrow={1}>
                        <ChatLogo
                            size="medium"
                            style={props.data.chat.__typename === 'SharedConversation' ? 'organization' : 'person'}
                            cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : undefined}
                        />
                        <ChatTitleContent separator={2}>
                            <Title>{props.data.chat.title}</Title>
                            <SubTitle>Openland</SubTitle>
                        </ChatTitleContent>
                    </ChatLeftContent>
                    <XOverflow
                        placement="bottom-end"
                        content={(
                            <>
                                <XOverflow.Item path="/mail">exit</XOverflow.Item>
                            </>
                        )}
                    />
                </ChatHeaderContent>
            </ChatHeaderWrapper>
            <ChatWrapper justifyContent="center">
                <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />
            </ChatWrapper>
        </ChatRoot>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};