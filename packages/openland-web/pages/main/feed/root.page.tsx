import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { FeedFragment } from 'openland-web/fragments/FeedFragment';

export default withApp('Home', 'viewer', props => {
    return (
        <>
            <XDocumentHead title="Feed" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <FeedFragment />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});
