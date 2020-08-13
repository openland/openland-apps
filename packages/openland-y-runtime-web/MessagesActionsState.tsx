import * as React from 'react';
import { MessagesActionsStateController } from 'openland-y-utils/MessagesActionsState';
import { MessengerContext } from 'openland-engines/MessengerEngine';

export const MessagesActionsStateProvider = React.memo((props: { children: any }) => {
    const engine = React.useContext(MessengerContext);
    MessagesActionsStateController.useProvider(engine);

    return (
        <>
            {props.children}
        </>
    );
});
