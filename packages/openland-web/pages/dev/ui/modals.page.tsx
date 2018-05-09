import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XModal } from 'openland-x-modal/XModal2';
import { XButton } from 'openland-x/XButton';

export default withApp('UI Framework - Modals', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Modals">
            <XContent>
                <XVertical>
                    <XTitle>Modals</XTitle>
                    <XModal target={<XButton text="Show Modal"/>}>
                        Hey!
                    </XModal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});