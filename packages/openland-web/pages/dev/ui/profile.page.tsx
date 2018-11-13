import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { OrganizationProfile } from '../../main/profile/ProfileComponent';

export default withApp('UI Framework - Profile', 'viewer', (props) => {
    return (
        <DevDocsScaffold>
            <OrganizationProfile organizationId="61gk9KRrl9ComJkvYnvdcddr4o" />
        </DevDocsScaffold>
    );
});