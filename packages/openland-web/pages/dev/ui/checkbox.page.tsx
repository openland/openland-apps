import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';

export default withApp('Checkbox', ['super-admin', 'software-developer'], props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XView>
                <UCheckbox checked={true} label="default checked" />
                <UCheckbox label="default" />
                <UCheckbox squared={true} checked={true} label="squared checked" />
                <UCheckbox squared={true} label="squared" />
                <UCheckbox asSwitcher={true} checked={true} label="as switcher checked" />
                <UCheckbox asSwitcher={true} label="as switcher" />
            </XView>
        </DevDocsScaffold>
    );
});