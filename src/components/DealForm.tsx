import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { XForm } from './X/XForm';
import { XCard } from './X/XCard';

export function DealForm(props: { mutation: MutationFunc<{}>, defaultValues?: { [key: string]: any; } }) {

    let defs: { [key: string]: any; } = {};
    let fields = ['title', 'address', 'location', 'status', 'statusDate', 'statusDescription'];
    if (props.defaultValues) {
        for (let k in props.defaultValues) {
            if (fields.indexOf(k) >= 0) {
                defs[k] = props.defaultValues[k];
            }
        }
    }

    return (
        <XForm submitMutation={props.mutation} defaultValues={defs}>
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
                <XForm.Submit style="dark">{props.defaultValues ? 'Save' : 'Add'}</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
}