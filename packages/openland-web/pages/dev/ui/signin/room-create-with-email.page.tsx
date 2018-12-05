import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomCreateWithEmail } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';

export default withApp('room-create-with-email', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <RoomSignup headerStyle="organization">
                <RoomCreateWithEmail />
            </RoomSignup>
        </DevDocsScaffold>
    );
});
