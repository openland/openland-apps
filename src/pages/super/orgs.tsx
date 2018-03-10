import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';
import { withSuperAccounts } from '../../api';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import { XButton } from '../../components/X/XButton';

export default withApp('super-admin', withSuperAccounts((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Accounts" description={props.data.superAccounts.length + ' total'} />
                <XTable>
                    <XTable.Header>
                        <XTable.Cell>Title</XTable.Cell>
                        <XTable.Cell>State</XTable.Cell>
                        <XTable.Cell>{}</XTable.Cell>
                    </XTable.Header>
                    <XTable.Body>
                        {props.data.superAccounts.map((v) => (
                            <XTable.Row key={v.id}>
                                <XTable.Cell>{v.title}</XTable.Cell>
                                <XTable.Cell>{v.state}</XTable.Cell>
                                <XTable.Cell>
                                    <div>
                                        <XButton path={'/super/orgs/' + v.id}>View</XButton>
                                    </div>
                                </XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </XTable>
            </XCard>
        </AppContent>
    );
}));