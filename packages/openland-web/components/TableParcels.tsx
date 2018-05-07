import * as React from 'react';
import Types from 'openland-api';
import { ParcelNumber } from './ParcelNumber';
import { withRouter } from 'openland-x-routing/withRouter';
import { XArea } from 'openland-x-format/XArea';
import { XTable } from 'openland-x/XTable';

export const TableParcels = withRouter<{ items: Types.ParcelShortFragment[], showCity?: boolean }>((props) => {
    return (
        <XTable>
            <XTable.Header>
                {props.showCity !== false && <XTable.Cell>City</XTable.Cell>}
                <XTable.Cell>Parcel ID</XTable.Cell>
                <XTable.Cell>Address</XTable.Cell>
                <XTable.Cell textAlign="right">Area</XTable.Cell>
                <XTable.Cell textAlign="right">Zoning</XTable.Cell>
            </XTable.Header>
            <XTable.Body>
                {props.items.map((v) => (
                    <XTable.Row key={v.id} path={'/parcels/' + v.id}>
                        {props.showCity !== false && <XTable.Cell>{v.city.name}</XTable.Cell>}
                        <XTable.Cell><ParcelNumber id={v.number} compact={true} /></XTable.Cell>
                        <XTable.Cell>{v.address}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.area && <XArea value={v.area.value} />}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasZoning && v.extrasZoning.join()}</XTable.Cell>
                    </XTable.Row>
                ))}
            </XTable.Body>
        </XTable>
    );
});