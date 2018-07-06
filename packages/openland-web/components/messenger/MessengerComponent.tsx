import * as React from 'react';
import { withUserInfo } from '../UserInfo';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { withApollo } from 'react-apollo';
import { MessengerRootComponent } from './components/MessengerRootComponent';

export const MessengerComponent = withChat(withApollo(withQueryLoader(withUserInfo((props) => {
    return (
        <MessengerRootComponent
            key={props.data.chat.id}
            conversationId={props.data.chat.id}
            seq={props.data.messages.seq}
            messages={props.data.messages.messages}
            client={props.client}
            me={props.user!!}
        />
    );
}))));