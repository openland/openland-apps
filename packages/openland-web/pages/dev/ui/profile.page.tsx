import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XMenuItem, XMenuTitle, XMenuItemWrapper, XMenuItemSeporator, XMenuVertical } from 'openland-x/XMenuItem';
import { OrganizationProfile } from '../../main/profile/ProfileComponent';

export default withApp('UI Framework - Profile', 'viewer', (props) => {
    return (
        <DevDocsScaffold>
            <OrganizationProfile organizationId="61gk9KRrl9ComJkvYnvdcddr4o" onBack={() => true} />
        </DevDocsScaffold>
    );
});