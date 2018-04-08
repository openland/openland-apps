import * as React from 'react';
import { XModalTargeted, XModalContent, XModalTarget } from './X/XModalTargeted';
import { withAddOpportunity } from '../api';
import { XForm } from './X/XForm';
import { XCard } from './X/XCard';

const OpportunityForm = withAddOpportunity((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

export const OpportunityCreate = (props: { parcelId: string, children?: any }) => {
    return (
        <XModalTargeted title="Create">
            <XModalContent>
                <OpportunityForm variables={{ parcelId: props.parcelId }} />
            </XModalContent>
            <XModalTarget>
                {props.children}
            </XModalTarget>
        </XModalTargeted>
    );
};