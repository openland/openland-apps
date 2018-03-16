import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { withDeals, withDealAdd } from '../../../api';
import { XLink } from '../../../components/X/XLink';
import { XTable } from '../../../components/X/XTable';
import { XModalRouted } from '../../../components/X/XModalRouted';
import { XForm } from '../../../components/X/XForm';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

const DealsForm = withDealAdd((props) => {
    return (
        <XForm submitMutation={props.add}>
            <XForm.Field title="Deal Name">
                <XForm.Text field="title" />
            </XForm.Field>
            <XForm.Field title="Location">
                <XForm.Text field="location" placeholder="ex: Brooklyn" />
            </XForm.Field>
            <XForm.Field title="Address">
                <XForm.Text field="address" placeholder="100 California St" />
            </XForm.Field>
            <XForm.Field title="Status">
                <XForm.Select
                    field="status"
                    options={[
                        { value: 'ACTIVE', title: 'Active' },
                        { value: 'CLOSED', title: 'Closed' },
                        { value: 'ON_HOLD', title: 'On Hold' },
                    ]}
                />
            </XForm.Field>
            <XForm.Field title="Status Description">
                <XForm.Text field="statusDescription" placeholder="ex: Waiting for titles" />
            </XForm.Field>
            <XForm.Field title="Status Date">
                <XForm.Text field="statusDate" placeholder="Date of status change" />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

export default withApp('viewer', withDeals((props) => {
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XHead title="Portfolio" />
                <XModalRouted title="Add New project" query="add">
                    <DealsForm />
                </XModalRouted>
                <XCard.Header text="Portfolio"><XButton query={{ field: 'add', value: 'true' }}>Add</XButton></XCard.Header>
                {props.data.deals!!.length > 0 && (
                    <XTable>
                        <XTable.Header>
                            <XTable.Cell>Title</XTable.Cell>
                            <XTable.Cell>Location</XTable.Cell>
                            <XTable.Cell>Address</XTable.Cell>
                            <XTable.Cell>Status</XTable.Cell>
                            <XTable.Cell>Status Date</XTable.Cell>
                        </XTable.Header>
                        <XTable.Body>
                            {props.data.deals!!.map((d) => (
                                <XTable.Row key={d.id} path={'/portfolio/' + d.id}>
                                    <XTable.Cell>
                                        {d.title}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {d.location}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {d.address}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {d.status}{d.statusDescription && ` (${d.statusDescription})`}
                                    </XTable.Cell>
                                    <XTable.Cell>
                                        {d.statusDate}
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
    );
}));