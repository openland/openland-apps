import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { withDebugReaders } from '../../api/withDebugReaders';
import { XTable } from 'openland-x/XTable';
import { withQueryLoader } from '../../components/withQueryLoader';

export default withApp('Super Readers', ['super-admin', 'software-developer'], withDebugReaders(withQueryLoader((props) => {
    // Auto-refreshing
    props.startPolling(5000);
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
})));