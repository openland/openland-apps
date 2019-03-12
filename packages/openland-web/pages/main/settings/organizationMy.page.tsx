import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { withMyOrganizationProfile } from 'openland-web/api/withMyOrganizationProfile';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { OrganizationSettings } from './components/organizationBase';

const Root = withMyOrganizationProfile(props => {
    console.warn('my');
    return (
        <OrganizationSettings
            data={{ organizationProfile: props.data.organizationProfile }}
            updateOrganizaton={props.updateOrganizaton}
            setShortname={props.setShortname}
            router={props.router}
        />
    );
}) as React.ComponentType<{ refetchVars: { organizationId: string } }>;

export default withApp(
    'Organization profile edit',
    'viewer',
    withQueryLoader(
        withMyOrganizationProfile(props => {
            return (
                <Root
                    refetchVars={{
                        organizationId: props.data.organizationProfile.id,
                    }}
                />
            );
        }),
    ),
);
