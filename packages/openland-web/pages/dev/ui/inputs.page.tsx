import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { XVertical } from 'openland-x-layout/XVertical';

export default withApp('Inputs', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XVertical>
                <UInput label="Label" />
                <UInput label="Label" value="value" />
            </XVertical>
        </DevDocsScaffold>
    );
});