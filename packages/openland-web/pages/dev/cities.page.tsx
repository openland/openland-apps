import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperCities } from '../../api/withSuperCities';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { XTable } from 'openland-x/XTable';
import { withQueryLoader } from '../../components/withQueryLoader';

export default withApp('Super Organizations', 'super-admin', withSuperCities(withQueryLoader((props) => {
    console.warn(props);
    return (
        <DevToolsScaffold title="Accounts">
            <XHeader text="Super Cities" description={props.data.superCities.length + ' total'}>{}</XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell width={100}>
                        Enabled
                    </XTable.Cell>
                    <XTable.Cell width={100}>
                        Key
                    </XTable.Cell>
                    <XTable.Cell>
                        Name
                    </XTable.Cell>
                    <XTable.Cell>
                        Map Blocks
                    </XTable.Cell>
                    <XTable.Cell>
                        Map Parcels
                    </XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.superCities.map((v) => (
                        <XTable.Row key={v.key}>
                            <XTable.Cell>
                                {v.enabled.toString()}
                            </XTable.Cell>
                            <XTable.Cell>
                                {v.key}
                            </XTable.Cell>
                            <XTable.Cell>
                                {v.name}
                            </XTable.Cell>
                            <XTable.Cell>
                                {v.blockSource}/{v.blockSourceLayer}
                            </XTable.Cell>
                            <XTable.Cell>
                                {v.parcelSource}/{v.parcelSourceLayer}
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
})));