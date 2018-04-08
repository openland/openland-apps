import '../../../../globals';
import * as React from 'react';
import { XHead } from '../../../../components/X/XHead';
import { withApp } from '../../../../components/withApp';
import { ReviewPage } from '../../../../components/ReviewPage';

export default withApp('Unit Placement', 'viewer', () => {
    return (
        <>
            <XHead title="Unit Placement Review" />
            <ReviewPage state="APPROVED_ZONING" />
        </>
    );
});