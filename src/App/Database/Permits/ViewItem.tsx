import * as React from 'react';
import { withPermitQuery } from '../../../api/Permits';
import { withLoader } from '../../Components/withLoader';

export default withPermitQuery(withLoader((p) => {
    return (
        <div>
            {p.data.permit.id}
            {p.data.permit.status}
        </div>
    );
}));