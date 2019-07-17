import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';
import { XVertical2 } from 'openland-x/XVertical2';
import { XVertical } from 'openland-x-layout/XVertical';

import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';
import { showCreateOrganization } from 'openland-web/fragments/org/showCreateOrganization';

export default withApp('UI Framework - New modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="New modals">
            <XContent>
                <XVertical2>
                    <XVertical width="400px">
                        <XButton text="New group" style="primary" onClick={() => showCreateGroupModal('group')}   />
                        <XButton text="New channel" style="primary"  onClick={() => showCreateGroupModal('channel')} />
                        <XButton text="New community" style="primary"  onClick={() => showCreateOrganization('community')} />
                        <XButton text="New organization" style="primary"  onClick={() => showCreateOrganization('organization')} />

                    </XVertical>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
