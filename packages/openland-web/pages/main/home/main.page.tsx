import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { withUserInfo } from '../../../components/UserInfo';

export default withApp('Home', 'viewer', withUserInfo((props) => {
    return (
        <>
            <XDocumentHead title={props.account!!.title} />
            <Scaffold>
                <Scaffold.Content>
                    {}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));