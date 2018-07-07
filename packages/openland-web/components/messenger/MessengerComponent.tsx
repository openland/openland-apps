import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHeader } from 'openland-x/XHeader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    return (
        <XVertical flexGrow={1} separator={'none'} maxWidth={1000}>
            <XHeader text={props.data.chat.title} separated={true} />
            <XHorizontal flexGrow={1} justifyContent="center">
                <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />
            </XHorizontal>
        </XVertical>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};