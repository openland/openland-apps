import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { AppContent } from '../../components/App/AppContent';
import { XHead } from '../../components/X/XHead';
import { XCard } from '../../components/X/XCard';

export default withApp('super-admin', withUserInfo((props) => {
    return (
        <AppContent>
            <XHead title="Debugging" />
            <XCard shadow="medium">
                <XCard.Header text="Your roles" />
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
            </XCard>
            <XCard shadow="medium">
                <XCard.Header text="Your Organization" />
                <XCard.Content>
                    {props.account && (
                        <>
                        <div>{props.account.title}</div>
                        </>
                    )}
                </XCard.Content>
            </XCard>
        </AppContent>
    );
}));