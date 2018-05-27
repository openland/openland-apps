import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';

export default withApp('Deals', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title={'Marketplace'} />
            <Scaffold>
                <Scaffold.Content>
                    {}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});