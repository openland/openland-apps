import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

export const CallHeaderButton = React.memo((props: { showCallModal: () => void }) => {
    const mediaSession = getMessenger().engine.calls.useCurrentSession();
    const disabled = !!mediaSession && mediaSession.callType !== 'call';
    return (
        <SHeaderButton
            title="Call"
            priority={1}
            disabled={disabled}
            icon={require('assets/ic-call-24.png')}
            onPress={props.showCallModal}
        />
    );
});
