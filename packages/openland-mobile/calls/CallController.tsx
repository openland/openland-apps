import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { getMessenger } from 'openland-mobile/utils/messenger';

export const CallController = XMemo<{ id: string, mute: boolean, isPrivate: boolean }>((props) => {
    let calls = getMessenger().engine.calls;
    React.useEffect(() => {
        calls.joinCall(props.id, props.isPrivate);
        return () => {
            calls.leaveCall();
        }
    }, []);
    React.useEffect(() => {
        calls.setMute(props.mute);
    }, [props.mute]);
    return null;
});