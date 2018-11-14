import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { OrganizationProfile } from '../../main/profile/ProfileComponent';

export default withApp('UI Framework - Profile (Organization)', 'viewer', (props) => {
    return (
        <DevDocsScaffold>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <OrganizationProfile organizationId="61gk9KRrl9ComJkvYnvdcddr4o" />
            </div>
        </DevDocsScaffold>
    );
});