import * as React from 'react';
import Types from 'openland-api';
import { XTable } from './X/XTable';
import { XArea } from './X/XArea';
import { withRouter } from './withRouter';
import { ParcelNumber } from './ParcelNumber';

export const TableParcels = withRouter<{ items: Types.ParcelShortFragment[] }>((props) => {
    return (
        <XTable>
            <XTable.Header>
                <XTable.Cell>City</XTable.Cell>
                <XTable.Cell>Parcel ID</XTable.Cell>
                <XTable.Cell>Address</XTable.Cell>
                <XTable.Cell textAlign="right">Area</XTable.Cell>
                <XTable.Cell textAlign="right">Zoning</XTable.Cell>
            </XTable.Header>
            <XTable.Body>
                {props.items.map((v) => (
                    <XTable.Row key={v.id} path={'/parcels/' + v.id}>
                        <XTable.Cell>{v.city.name}</XTable.Cell>
                        <XTable.Cell><ParcelNumber id={v.number} compact={true} /></XTable.Cell>
                        <XTable.Cell>{v.address}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasArea && <XArea area={v.extrasArea} />}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasZoning && v.extrasZoning.join()}</XTable.Cell>
                    </XTable.Row>
                ))}
            </XTable.Body>
        </XTable>
    );
});