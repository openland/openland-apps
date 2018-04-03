import * as React from 'react';
import Types from 'openland-api';
import { XIcon } from './X/XIcon';
import { XTable } from './X/XTable';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { withRouter } from './withRouter';

export const TableParcels = withRouter<{ items: Types.ParcelShortFragment[] }>((props) => {
    return (
        <XTable>
            <XTable.Header>
                <XTable.Cell>Parcel ID</XTable.Cell>
                <XTable.Cell>Address</XTable.Cell>
                <XTable.Cell textAlign="right">Area</XTable.Cell>
                <XTable.Cell textAlign="right">Land Value</XTable.Cell>
                <XTable.Cell textAlign="right">Improvement Value</XTable.Cell>
                <XTable.Cell textAlign="right">Zoning</XTable.Cell>
                <XTable.Cell textAlign="right">Favorites</XTable.Cell>
            </XTable.Header>
            <XTable.Body>
                {props.items.map((v) => (
                    <XTable.Row key={v.id} path={'/parcels/' + v.id}>
                        <XTable.Cell>{v.title}</XTable.Cell>
                        <XTable.Cell>{v.addresses.length > 0 && `${v.addresses[0].streetNumber} ${v.addresses[0].streetName} ${v.addresses[0].streetNameSuffix}`}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasArea && <XArea area={v.extrasArea} />}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasLandValue && <XMoney value={v.extrasLandValue} />}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasImprovementValue && <XMoney value={v.extrasImprovementValue} />}</XTable.Cell>
                        <XTable.Cell textAlign="right">{v.extrasZoning && v.extrasZoning.join()}</XTable.Cell>
                        <XTable.Cell textAlign="right">
                            <XIcon
                                icon={v.likes.liked ? 'favorite' : 'favorite_border'}
                            />
                        </XTable.Cell>
                    </XTable.Row>
                ))}
            </XTable.Body>
        </XTable>
    );
});