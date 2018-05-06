import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { XForm } from './X/XForm';
import { XCard } from './X/XCard';
import { ParcelSelect } from '../api';

export function DealForm(props: { mutation: MutationFunc<{}>, defaultValues?: { [key: string]: any; } }) {

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
        <XForm submitMutation={props.mutation} defaultValues={defs}>
            <XForm.Field title="Deal Name">
                <XForm.Text field="title" />
            </XForm.Field>

            <XForm.Field title="Price">
                <XForm.Text field="price" />
            </XForm.Field>
            <XForm.Field title="Area">
                <XForm.Text field="extrasArea" />
            </XForm.Field>
            <XForm.Field title="Tax Bill">
                <XForm.Text field="extrasTaxBill" />
            </XForm.Field>
            <XForm.Field title="Parcel">
                <XForm.Select field="parcelId" component={ParcelSelect} />
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
            <XForm.Field title="Company">
                <XForm.Text field="extrasCompany" />
            </XForm.Field>
            <XForm.Field title="Seller's Attorney">
                <XForm.Text field="extrasAttorney" />
            </XForm.Field>
            <XForm.Field title="Referee">
                <XForm.Text field="extrasReferee" />
            </XForm.Field>
            <XForm.Field title="Lot Shape">
                <XForm.Text field="extrasLotShape" />
            </XForm.Field>
            <XForm.Field title="Lot Size">
                <XForm.Text field="extrasLotSize" />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="primary" text={props.defaultValues ? 'Save' : 'Add'}/>
            </XCard.Footer>
        </XForm>
    );
}