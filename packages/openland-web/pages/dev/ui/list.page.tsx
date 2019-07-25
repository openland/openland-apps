import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

export default withApp('List items', 'viewer', props => {
    return (
        <DevDocsScaffold title="List items">
            <XView marginHorizontal={-16}>
                <UListItem title="List Item 1" onClick={() => { /**/ }} />
                <UListItem title="List Item 2" description="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" />
            </XView>
            <br />
            [TBD]
        </DevDocsScaffold>
    );
});