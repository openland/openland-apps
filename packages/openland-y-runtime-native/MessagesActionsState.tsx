import * as React from 'react';
import { MessagesActionsStateController } from 'openland-y-utils/MessagesActionsState';
import { getMessenger } from 'openland-mobile/utils/messenger';

export const MessagesActionsStateProvider = React.memo((props) => {
    MessagesActionsStateController.useProvider(getMessenger().engine);

    return (
        <>
            {props.children}
        </>
    );
});
