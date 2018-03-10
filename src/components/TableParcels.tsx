import * as React from 'react';
import * as Types from '../api/Types';
import { XIcon } from './X/XIcon';
import { XCard } from './X/XCard';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { withRouter } from './withRouter';

export const TableParcels = withRouter<{ items: Types.ParcelShortFragment[] }>((props) => {
    return (
        <XCard.Table>
            <XCard.Table.Header>
                <XCard.Table.Cell>Parcel ID</XCard.Table.Cell>
                <XCard.Table.Cell>Address</XCard.Table.Cell>
                <XCard.Table.Cell textAlign="right">Area</XCard.Table.Cell>
                <XCard.Table.Cell textAlign="right">Land Value</XCard.Table.Cell>
                <XCard.Table.Cell textAlign="right">Improvement Value</XCard.Table.Cell>
                <XCard.Table.Cell textAlign="right">Zoning</XCard.Table.Cell>
                <XCard.Table.Cell textAlign="right">Favorites</XCard.Table.Cell>
            </XCard.Table.Header>
            <XCard.Table.Body>
                {props.items.map((v) => (
                    <XCard.Table.Row key={v.id} path={'/parcels/' + v.id}>
                        <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.addresses.length > 0 && `${v.addresses[0].streetNumber} ${v.addresses[0].streetName} ${v.addresses[0].streetNameSuffix}`}</XCard.Table.Cell>
                        <XCard.Table.Cell textAlign="right">{v.extrasArea && <XArea area={v.extrasArea} />}</XCard.Table.Cell>
                        <XCard.Table.Cell textAlign="right">{v.extrasLandValue && <XMoney value={v.extrasLandValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell textAlign="right">{v.extrasImprovementValue && <XMoney value={v.extrasImprovementValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell textAlign="right">{v.extrasZoning && v.extrasZoning.join()}</XCard.Table.Cell>
                        <XCard.Table.Cell textAlign="right">
                            <XIcon
                                icon={v.likes.liked ? 'favorite' : 'favorite_border'}
                            />
                        </XCard.Table.Cell>
                    </XCard.Table.Row>
                ))}
            </XCard.Table.Body>
        </XCard.Table>
    );
});