import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { OrganizationSettings } from './components/organizationBase';
import { XLoader } from 'openland-x/XLoader';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';

export default withApp('Organization profile edit', 'viewer', () => {
    let router = React.useContext(XRouterContext)!;
    const client = useClient();
    let organizationId = router.routeQuery.organizationId;
    const data = client.useOrganizationProfile({ organizationId });

    const updateOrganizaton = async ({ variables: { input } }: { variables: { input: any } }) => {
        await client.mutateUpdateOrganization({ input, organizationId });
        await client.refetchOrganization({ organizationId });
        await client.refetchOrganizationProfile({ organizationId });
    };

    const setShortname = async ({
        variables: { shortname },
    }: {
        variables: { shortname: string };
    }) => {
        await client.mutateSetOrgShortname({ shortname, organizationId });
        await client.refetchOrganization({ organizationId });
        await client.refetchOrganizationProfile({ organizationId });
    };

    return (
        <>
            {data.organizationProfile ? (
                <OrganizationSettings
                    data={{ organizationProfile: data.organizationProfile }}
                    updateOrganizaton={updateOrganizaton}
                    setShortname={setShortname}
                    router={router}
                    hideMembers={true}
                />
            ) : (
                <XLoader loading={true} />
            )}
        </>
    );
});
