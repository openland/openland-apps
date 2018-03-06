import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/Base/UserInfo';
import { AppContent } from '../../components/App/AppContent';
import { XHead } from '../../components/X/XHead';
import { XCard } from '../../components/X/XCard';

export default withApp('super-admin', withUserInfo((props) => {
    return (
        <AppContent>
            <XHead title="Debugging" />
            <XCard shadow="medium">
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell>Permission Name</XCard.Table.Cell>
                        <XCard.Table.Cell>Description</XCard.Table.Cell>
                    </XCard.Table.Header>
                    <XCard.Table.Body>
                        {props.roles.map((v) => (
                            <tr>
                                <XCard.Table.Cell>{v}</XCard.Table.Cell>
                                <XCard.Table.Cell>{}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </XCard.Table.Body>
                </XCard.Table>
                {/* {} */}
            </XCard>
        </AppContent>
    )
}));