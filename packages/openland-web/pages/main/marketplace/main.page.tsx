import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XTable } from 'openland-x/XTable';
import { XButton } from 'openland-x/XButton';

export default withApp('Marketplace', 'viewer', withExploreOrganizations(withQueryLoader((props) => {
    return (
        <>
            <XDocumentHead title={'Marketplace'} />
            <Scaffold>
                <Scaffold.Content>
                    <XTable>
                        <XTable.Body>
                            {props.data.items!!.edges.map((v) => (
                                <XTable.Row path={'/directory/o/' + v.node.id}>
                                    <XTable.Cell>{v.node.name}</XTable.Cell>
                                    <XTable.Cell><XButton path={'/mail/o/' + v.node.id} text="Connect" /></XTable.Cell>
                                </XTable.Row>
                            ))}
                        </XTable.Body>
                    </XTable>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));