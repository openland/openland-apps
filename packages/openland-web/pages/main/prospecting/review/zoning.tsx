import '../../../../globals';
import * as React from 'react';
import { XHead } from '../../../../components/X/XHead';
import { withApp } from '../../../../components/withApp';
import { ReviewPage } from '../../../../components/ReviewPage';

export default withApp('Zoning Review', 'viewer', () => {
    return (
        <>
            <XHead title="Zoning Review" />
            <ReviewPage state="APPROVED_INITIAL" />
        </>
    );
});