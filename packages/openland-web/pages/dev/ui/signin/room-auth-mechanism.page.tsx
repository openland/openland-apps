import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomAuthMechanism } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';

export default withApp('room-auth-mechanism', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <RoomSignup headerStyle="organization">
                <RoomAuthMechanism />
            </RoomSignup>
        </DevDocsScaffold>
    );
});
