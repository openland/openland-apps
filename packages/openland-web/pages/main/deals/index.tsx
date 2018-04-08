import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { withDeals, withDealAdd } from '../../../api/';
import { XLink } from '../../../components/X/XLink';
import { XTable } from '../../../components/X/XTable';
import { XModalRouted } from '../../../components/X/XModalRouted';
import { DealForm } from '../../../components/DealForm';
import { XMoney } from '../../../components/X/XMoney';
import { XBullet } from '../../../components/X/XBullet';
import { XArea } from '../../../components/X/XArea';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

const DealsForm = withDealAdd((props) => <DealForm mutation={props.add} />);

export default withApp('Deals', 'viewer', withDeals((props) => {
    return (
        <>
            <XHead title="Deals" />
            <XModalRouted title="Add New project" query="add">
                <DealsForm />
            </XModalRouted>
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Deals">
                        <XButton query={{ field: 'add', value: 'true' }}>Add</XButton>
                    </XCard.Header>
                    {props.data.deals!!.length > 0 && (
                        <XTable>
                            <XTable.Header>
                                <XTable.Cell textAlign="left" width={140}>Parcel</XTable.Cell>
                                <XTable.Cell>Title</XTable.Cell>
                                <XTable.Cell width={200}>Location</XTable.Cell>
                                <XTable.Cell textAlign="right">Area</XTable.Cell>
                                <XTable.Cell textAlign="right">Price</XTable.Cell>
                                <XTable.Cell width={150}>Status</XTable.Cell>
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
                                            {d.parcel && d.parcel.extrasArea != null && <XArea area={d.parcel.extrasArea} />}
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
                    )}
                    {props.data.deals!!.length === 0 && (
                        <XCard.Empty icon="work" text="You can add new project">
                            <Link query={{ field: 'add', value: 'true' }} >here</Link>
                        </XCard.Empty>
                    )}
                </XCard>
            </AppContent>
        </>
    );
}));