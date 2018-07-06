import * as React from 'react';
import { withUserInfo } from '../UserInfo';
import { withApollo } from 'react-apollo';
import { MessengerRootComponent } from './components/MessengerRootComponent';

export const MessengerComponent = withApollo<{ conversationId: string }>(withUserInfo((props) => {
    return (
        <MessengerRootComponent
            key={props.conversationId}
            conversationId={props.conversationId}
            client={props.client}
            me={props.user!!}
        />
    );
}));