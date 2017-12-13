import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withPermitQuery, StatusChanged } from '../../../api/Permits';
import { XContainer } from '../../../components/X/XContainer';
import { Segment } from 'semantic-ui-react';
export default withPage(withPermitQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <Segment>

                    <div>PermitId: {props.data.permit.id}</div>
                    <div>Status: {props.data.permit.status} {props.data.permit.statusUpdatedAt}</div>
                    <div>Type: {props.data.permit.type} {props.data.permit.typeWood}</div>
                    {props.data.permit.streetNumbers!!.map((s) =>
                        (<div key={s.streetId}>Address: {s.streetNumber} {s.steetNumberSuffix} {s.streetName} {s.streetNameSuffix}</div>))
                    }
                    {props.data.permit.existingStories && props.data.permit.proposedStories &&
                        (<div>Stories: {props.data.permit.existingStories} / {props.data.permit.proposedStories}</div>)
                    }
                    {props.data.permit.existingUnits && props.data.permit.proposedUnits &&
                        (<div>Units: {props.data.permit.existingUnits} / {props.data.permit.proposedUnits}</div>)
                    }
                    <div> Description: {props.data.permit.description}</div>
                    <div> Proposed Use: {props.data.permit.proposedUse}</div>
                    {props.data.permit.events.map((p, i) => {
                        let s = (p as StatusChanged);
                        return <div key={'ind_' + i}>{s.oldStatus} -> {s.newStatus} at {s.date}</div>;
                    })}
                </Segment>
            </XContainer>
        </div>
    );
}));