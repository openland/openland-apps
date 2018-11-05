import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withOrganizationProfile } from '../../../api/withOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { OrganizationSettigs } from './organizationBase';
import { XLoader } from 'openland-x/XLoader';

const Root = withOrganizationProfile((props) => (
    props.data.organizationProfile
        ? (
            <OrganizationSettigs
                data={{ organizationProfile: props.data.organizationProfile }}
                updateOrganizaton={props.updateOrganizaton}
                router={props.router}
                hideMembers={true}
            />
        )
        : <XLoader loading={true} />
)) as React.ComponentType<{ refetchVars: { organizationId: string } }>;

export default withApp('Organization profile edit', 'viewer', withOrganizationProfile(withQueryLoader((props) => {
    return (
        <Root refetchVars={{ organizationId: props.router.routeQuery.organizationId }} />
    );
})));
