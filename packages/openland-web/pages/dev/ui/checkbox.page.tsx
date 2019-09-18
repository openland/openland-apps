import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { XVertical } from 'openland-x-layout/XVertical';

export default withApp('Checkbox', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XVertical>
                <UCheckbox checked={true} label="default checked" />
                <UCheckbox label="default" />
                <UCheckbox squared={true} checked={true} label="squared checked" />
                <UCheckbox squared={true} label="squared" />
                <UCheckbox asSwitcher={true} checked={true} label="as switcher checked" />
                <UCheckbox asSwitcher={true} label="as switcher" />
            </XVertical>
        </DevDocsScaffold>
    );
});