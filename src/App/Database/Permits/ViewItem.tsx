import * as React from 'react';
import { withPermitQuery } from '../../../api/Permits';
import { withLoader } from '../../Components/withLoader';

export default withPermitQuery(withLoader((p) => {
    return (
        <div>
            <div>PermitId: {p.data.permit.id}</div>
            <div>Status: {p.data.permit.status} {p.data.permit.statusUpdatedAt}</div>
            <div>Type: {p.data.permit.type} {p.data.permit.typeWood}</div>
            {p.data.permit.streetNumbers!!.map((p) =>
                (<div key={p.streetId}>Address: {p.streetNumber} {p.steetNumberSuffix} {p.streetName} {p.streetNameSuffix}</div>))
            }
            {p.data.permit.existingStories && p.data.permit.proposedStories &&
                (<div>Stories: {p.data.permit.existingStories} / {p.data.permit.proposedStories}</div>)
            }
            {p.data.permit.existingUnits && p.data.permit.proposedUnits &&
                (<div>Units: {p.data.permit.existingUnits} / {p.data.permit.proposedUnits}</div>)
            }
            <div> Description: {p.data.permit.description}</div>
            <div> Proposed Use: {p.data.permit.proposedUse}</div>
        </div>
    );
}));