import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { XVertical } from 'openland-x-layout/XVertical';

export default withApp('Checkbox', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XVertical>
                <UCheckbox checked label="default checked" />
                <UCheckbox label="default" />
                <UCheckbox squared checked label="squared checked" />
                <UCheckbox squared label="squared" />
                <UCheckbox asSwitcher checked label="as switcher checked" />
                <UCheckbox asSwitcher label="as switcher" />
            </XVertical>
        </DevDocsScaffold>
    );
});