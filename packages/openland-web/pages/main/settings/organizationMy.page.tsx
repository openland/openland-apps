import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withMyOrganizationProfile } from '../../../api/withMyOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { OrganizationSettigs } from './organizationBase';

const Root = withMyOrganizationProfile((props) => {
    console.warn('my');
    return (
        <OrganizationSettigs data={{ organizationProfile: props.data.organizationProfile }} updateOrganizaton={props.updateOrganizaton} router={props.router} />
    );
}) as React.ComponentType<{ refetchVars: { organizationId: string } }>;

export default withApp('Organization profile edit', 'viewer', withQueryLoader(withMyOrganizationProfile((props) => {
    return (
        <Root refetchVars={{ organizationId: props.data.organizationProfile.id }} />
    );
})));
