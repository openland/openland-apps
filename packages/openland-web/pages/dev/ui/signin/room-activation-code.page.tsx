import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomActivationCode } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';

export default withApp('room-activation-code', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <RoomSignup headerStyle="organization">
                <RoomActivationCode />
            </RoomSignup>
        </DevDocsScaffold>
    );
});
