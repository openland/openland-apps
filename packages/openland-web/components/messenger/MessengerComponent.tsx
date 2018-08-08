import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../Incubator/XOverflow';
import { makeNavigable } from 'openland-x/Navigable';
import { XMenuItem } from 'openland-x/XMenuItem';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TextComponent } from '../../../../node_modules/@types/react-native';
import { TypignsComponent, TypingContext } from './components/TypingsComponent';

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
    justifyContent: 'center',
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

const NavChatLeftContent = makeNavigable(ChatLeftContent);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path ? 'pointer' : undefined
}));

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    return (
        <ChatRoot flexGrow={1} separator={'none'}>
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <NavChatLeftContentStyled
                        path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                        separator={10}
                        alignItems="center"
                        flexGrow={1}
                    >
                        <ChatLogo
                            path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                            size="medium"
                            style={props.data.chat.__typename === 'SharedConversation' ? 'organization' : 'person'}
                            cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : undefined}
                        />
                        <ChatTitleContent separator={2}>
                            <Title>{props.data.chat.title}</Title>

                            <TypignsComponent conversatonId={props.data.chat.id}>
                                <TypingContext.Consumer>
                                    {typing => <SubTitle>{typing.typing || (props.data.chat.__typename === 'SharedConversation' ? 'Organization' : 'Person')}</SubTitle>}
                                </TypingContext.Consumer>
                            </TypignsComponent>

                        </ChatTitleContent>
                    </NavChatLeftContentStyled>
                    <XOverflow
                        placement="bottom-end"
                        content={(
                            <>
                                <XMenuItem path="/mail">exit</XMenuItem>
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