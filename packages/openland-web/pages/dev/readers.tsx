import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from '../../components/X/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';
import { withDebugReaders } from '../../api';
import { XTable } from 'openland-x/XTable';

export default withApp('Super Readers', ['super-admin', 'software-developer'], withDebugReaders((props) => {
    // Auto-refreshing
    props.data.startPolling(5000);
    return (
        <DevToolsScaffold title="Debugging">
            <XHeader text="System Event Reader status" />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Reader Name</XTable.Cell>
                    <XTable.Cell>Remaining</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.debugReaderStates.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{v.title}</XTable.Cell>
                            <XTable.Cell>{v.remaining}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
}));