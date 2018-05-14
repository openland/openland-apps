import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Sidebar } from '../../../components/Sidebar';

export default withApp('Folders', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title={['Folders']} />
            <Scaffold>
                <Scaffold.Menu>
                    <Sidebar title="Folders">
                        {}
                    </Sidebar>
                </Scaffold.Menu>
                <Scaffold.Content>
                    {}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});
