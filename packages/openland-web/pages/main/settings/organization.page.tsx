import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withOrganizationProfile } from '../../../api/withOrganizationProfile';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { OrganizationSettings } from './organizationBase';
import { XLoader } from 'openland-x/XLoader';

const Root = withOrganizationProfile(props =>
    props.data.organizationProfile ? (
        <OrganizationSettings
            data={{ organizationProfile: props.data.organizationProfile }}
            updateOrganizaton={props.updateOrganizaton}
            setShortname={props.setShortname}
            router={props.router}
            hideMembers={true}
        />
    ) : (
        <XLoader loading={true} />
    ),
) as React.ComponentType<{ refetchVars: { organizationId: string } }>;

export default withApp(
    'Organization profile edit',
    'viewer',
    withOrganizationProfile(
        withQueryLoader(props => {
            return (
                <Root
                    refetchVars={{
                        organizationId: props.router.routeQuery.organizationId,
                    }}
                />
            );
        }),
    ),
);
