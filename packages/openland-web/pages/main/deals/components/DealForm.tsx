import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { XForm } from 'openland-x-forms/XForm';
import { ParcelSelect } from '../../../../api';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';

export function DealForm(props: {
    query: string,
    title: string,
    action: string,
    mutation: MutationFunc<{}>,
    defaultValues?: { [key: string]: any; }
}) {

    let defs: { [key: string]: any; } = {};
    let fields = ['title', 'address', 'location', 'status', 'statusDate', 'statusDescription',
        'price', 'extrasArea', 'extrasCompany', 'extrasAttorney', 'extrasReferee', 'extrasLotShape',
        'extrasLotSize', 'extrasTaxBill'];

    if (props.defaultValues) {
        for (let k in props.defaultValues) {
            if (fields.indexOf(k) >= 0) {
                defs[k] = props.defaultValues[k];
            }
        }
        if (props.defaultValues.parcel) {
            defs.parcelId = props.defaultValues.parcel.id;
        }
    }

    return (
        <XModalForm submitMutation={props.mutation} defaultValues={defs} targetQuery={props.query} actionName={props.action} title={props.title}>
            <XFormField title="Deal Name">
                <XForm.Text field="title" />
            </XFormField>

            <XFormField title="Price">
                <XForm.Text field="price" />
            </XFormField>
            <XFormField title="Area">
                <XForm.Text field="extrasArea" />
            </XFormField>
            <XFormField title="Tax Bill">
                <XForm.Text field="extrasTaxBill" />
            </XFormField>
            <XFormField title="Parcel">
                <XForm.Select field="parcelId" component={ParcelSelect} />
            </XFormField>
            <XFormField title="Location">
                <XForm.Text field="location" placeholder="ex: Brooklyn" />
            </XFormField>
            <XFormField title="Address">
                <XForm.Text field="address" placeholder="100 California St" />
            </XFormField>
            <XFormField title="Status">
                <XForm.Select
                    field="status"
                    options={[
                        { value: 'ACTIVE', title: 'Active' },
                        { value: 'CLOSED', title: 'Closed' },
                        { value: 'ON_HOLD', title: 'On Hold' },
                    ]}
                />
            </XFormField>
            <XFormField title="Status Description">
                <XForm.Text field="statusDescription" placeholder="ex: Waiting for titles" />
            </XFormField>
            <XFormField title="Status Date">
                <XForm.Text field="statusDate" placeholder="Date of status change" />
            </XFormField>
            <XFormField title="Company">
                <XForm.Text field="extrasCompany" />
            </XFormField>
            <XFormField title="Seller's Attorney">
                <XForm.Text field="extrasAttorney" />
            </XFormField>
            <XFormField title="Referee">
                <XForm.Text field="extrasReferee" />
            </XFormField>
            <XFormField title="Lot Shape">
                <XForm.Text field="extrasLotShape" />
            </XFormField>
            <XFormField title="Lot Size">
                <XForm.Text field="extrasLotSize" />
            </XFormField>
        </XModalForm>
    );
}