import '../../../../globals';
import * as React from 'react';
import { XHead } from '../../../../components/X/XHead';
import { withApp } from '../../../../components/withApp';
import { ReviewPage } from '../../../../components/ReviewPage';

export default withApp('Initial Review', 'viewer', () => {
    return (
        <>
            <XHead title="Initial Review" />
            <ReviewPage state="INCOMING" />
        </>
    );
});