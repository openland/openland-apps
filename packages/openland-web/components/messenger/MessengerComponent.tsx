import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHeader } from 'openland-x/XHeader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';

const ChatRoot = Glamorous(XVertical)({
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
});

const ChatWrapper = Glamorous(XHorizontal)({
    maxHeight: 'calc(100% - 65px)',
    width: '100%',
    overflow: 'hidden'
});

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    return (
        <ChatRoot flexGrow={1} separator={'none'}>
            <XHeader text={props.data.chat.title} separated={true} />
            <ChatWrapper flexGrow={1} justifyContent="center">
                <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />
            </ChatWrapper>
        </ChatRoot>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};