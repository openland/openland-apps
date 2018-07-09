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
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
});

const ChatWrapper = Glamorous(XHorizontal)({
    maxHeight: 'calc(100% - 79px)',
    width: '100%',
    overflow: 'hidden'
});

const ChatHeaderWrapper = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 79,
    paddingLeft: 40,
    paddingRight: 40,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const ChatLogo = Glamorous(XAvatar)({
    width: 50,
    height: 50
});

const Title = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    color: '#334562'
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
            {console.log(props)}
            <ChatHeaderWrapper>
                <XHorizontal alignItems="center" maxWidth={850} flexGrow={1}>
                    <XHorizontal separator={10} alignItems="center" flexGrow={1}>
                        <ChatLogo
                            size="medium"
                            style={props.data.chat.__typename === 'SharedConversation' ? 'organization' : 'person'}
                            cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : undefined}
                        />
                        <XVertical separator={2}>
                            <Title>{props.data.chat.title}</Title>
                            <SubTitle>Openland</SubTitle>
                        </XVertical>
                    </XHorizontal>
                    <XOverflow
                        placement="bottom-end"
                        content={(
                            <>
                                <XOverflow.Item path="/mail">exit</XOverflow.Item>
                            </>
                        )}
                    />
                </XHorizontal>
            </ChatHeaderWrapper>
            <ChatWrapper flexGrow={1} justifyContent="center">
                <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />
            </ChatWrapper>
        </ChatRoot>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};