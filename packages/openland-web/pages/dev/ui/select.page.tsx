import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XSelect } from 'openland-x/XSelect';

export default withApp('UI Framework - Select', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Select">
            <XContent>
                <XVertical>
                    <XTitle>Select</XTitle>
                    <XSelect
                        options={[
                            { value: 'one', label: 'One' },
                            { value: 'two', label: 'Two' },
                        ]}
                    />
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});