import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { withDeals, withDealAdd } from '../../../api/';
import { XTable } from '../../../components/X/XTable';
import { XModalRouted } from '../../../components/X/XModalRouted';
import { DealForm } from '../../../components/DealForm';
import { XBullet } from '../../../components/X/XBullet';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XWithRole } from '../../../components/X/XWithRole';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XArea } from 'openland-x-format/XArea';
import { XMoney } from 'openland-x-format/XMoney';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

const DealsForm = withDealAdd((props) => <DealForm mutation={props.add} />);

export default withApp('Deals', 'viewer', withDeals((props) => {

    const exportCVS = () => {
        let wrap = (data: any) => {
            return '"' + (data !== null && data !== undefined ? data : '') + '"';
        };

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Parcel,';
        csvContent += 'Title,';
        csvContent += 'Location,';
        csvContent += 'Area,';
        csvContent += 'Status,';
        csvContent += '\r\n';
        for (let row of props.data.deals) {

            csvContent += wrap(row.parcel ? row.parcel.title : '') + ',';
            csvContent += wrap(row.title) + ',';
            csvContent += wrap(row.location) + ',';
            csvContent += wrap(row.extrasArea !== null && row.extrasArea !== undefined ? Math.round(row.extrasArea * 10.7639) : '') + ',';
            csvContent += wrap(row.status) + ',';
            csvContent += '\r\n';
        }

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', props.data.variables.state + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <XHead title="Deals" />
            <XModalRouted title="Add New project" query="add">
                <DealsForm />
            </XModalRouted>
            <Scaffold>
                <Scaffold.Content>
                    <XHeader text="Deals">
                        <XButton query={{ field: 'add', value: 'true' }} text="Add"/>
                    </XHeader>
                    {props.data.deals!!.length > 0 && (
                        <>
                            <XTable>
                                <XTable.Header>
                                    <XTable.Cell textAlign="left" width={140}>Parcel</XTable.Cell>
                                    <XTable.Cell>Title</XTable.Cell>
                                    <XTable.Cell width={200}>Location</XTable.Cell>
                                    <XTable.Cell textAlign="right">Area</XTable.Cell>
                                    <XTable.Cell textAlign="right">Price</XTable.Cell>
                                    <XTable.Cell textAlign="center" width={150}>Status</XTable.Cell>
                                </XTable.Header>
                                <XTable.Body>
                                    {props.data.deals!!.map((d) => (
                                        <XTable.Row key={d.id} path={'/deals/' + d.id}>
                                            <XTable.Cell textAlign="left">
                                                {d.parcel && d.parcel.title}
                                            </XTable.Cell>
                                            <XTable.Cell>
                                                {d.title}
                                            </XTable.Cell>
                                            <XTable.Cell>
                                                {d.location}
                                            </XTable.Cell>
                                            <XTable.Cell textAlign="right">
                                                {d.parcel && d.parcel.extrasArea != null && <XArea value={d.parcel.extrasArea} />}
                                            </XTable.Cell>
                                            <XTable.Cell textAlign="right">
                                                {d.price && <XMoney value={d.price} />}
                                            </XTable.Cell>
                                            <XTable.Cell textAlign="right">
                                                {d.status === 'CLOSED' && <XBullet color="green">Closed</XBullet>}
                                                {d.status === 'ACTIVE' && <XBullet color="blue">{d.statusDescription}</XBullet>}
                                                {d.status === 'ACTIVE' && !d.statusDescription && <XBullet color="blue">Active</XBullet>}
                                                {d.status === 'ON_HOLD' && <XBullet color="yellow">Adjourned</XBullet>}
                                            </XTable.Cell>
                                        </XTable.Row>
                                    ))}

                                </XTable.Body>
                            </XTable>
                            <XWithRole role={['super-admin', 'software-developer', 'feature-customer-kassita']}>
                                <XCard.Footer >
                                    <XButton style="primary" onClick={exportCVS} text="Export"/>
                                </XCard.Footer>
                            </XWithRole>
                        </>
                    )}
                    {props.data.deals!!.length === 0 && (
                        <XCard.Empty icon="work" text="You can add new project">
                            <Link query={{ field: 'add', value: 'true' }} >here</Link>
                        </XCard.Empty>
                    )}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));