import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { AppContent } from '../../components/App/AppContent';
import { XHead } from '../../components/X/XHead';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import { XHeader } from '../../components/X/XHeader';

export default withApp('Super Debug', ['super-admin', 'software-developer'], withUserInfo((props) => {
    return (
        <>
            <XHead title="Debugging" />
            <AppContent>
                <XCard shadow="medium">
                    <XHeader text="Your roles" />
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell>Permission Name</XTable.Cell>
                            <XTable.Cell>Description</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.roles.map((v) => (
                                <XTable.Row>
                                    <XTable.Cell>{v}</XTable.Cell>
                                    <XTable.Cell>{}</XTable.Cell>
                                </XTable.Row>
                            ))}
                        </XTable.Body>
                    </XTable>
                </XCard>
                <XCard shadow="medium">
                    <XHeader text="Your Organization" />
                    <XCard.Content>
                        {props.account && (
                            <>
                                <div>{props.account.title}</div>
                            </>
                        )}
                    </XCard.Content>
                </XCard>
            </AppContent>
        </>
    );
}));