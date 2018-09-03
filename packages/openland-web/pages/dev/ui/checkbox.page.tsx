import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XCheckbox } from 'openland-x/XCheckbox';

export default withApp('UI Framework - Checkboxes', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Checkboxes">
            <XContent>
                <XVertical>
                    <XTitle>Default</XTitle>
                    <XHorizontal>
                        <XCheckbox label="Default" />
                        <XCheckbox label="Checked" checked={true} />
                        <XCheckbox label="Disabled" disabled={true} />
                        <XCheckbox label="Disabled checked" disabled={true} checked={true} />
                    </XHorizontal>
                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XCheckbox label="Default" loading={true} />
                    </XHorizontal>
                    <XTitle>Switchers</XTitle>
                    <XHorizontal>
                        <XCheckbox label="Default" switcher={true} />
                        <XCheckbox label="Checked" switcher={true} checked={true} />
                        <XCheckbox label="Disabled" switcher={true} disabled={true} />
                        <XCheckbox label="Disabled checked" switcher={true} disabled={true} checked={true} />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});