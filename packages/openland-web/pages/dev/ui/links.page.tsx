import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XLink } from 'openland-x/XLink';

export default withApp('UI Framework - Links', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Links">
            <XContent>
                <XLink path="/ui">Simple Path</XLink>
                <XLink query={{ field: 'query', value: 'yes' }}>Query String Set</XLink>
                <XLink query={{ field: 'query' }}>Query String Remove</XLink>
                {/* <XVertical>
                    <XTitle>Select</XTitle>
                    <XSelect
                        options={[
                            { value: 'one', label: 'One' },
                            { value: 'two', label: 'Two' },
                        ]}
                    />
                </XVertical> */}
            </XContent>
        </DevDocsScaffold>
    );
});