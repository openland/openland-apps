import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XRouter } from 'openland-x-routing/XRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { CommunityType, CreateEntity, EntityKind } from './createEntity';

const CreateCommunityModal = ({ hide }: { hide(): void }) => {
    const { user, organization } = React.useContext(UserInfoContext)!;
    const router = React.useContext(XRouterContext) as XRouter;
    const { routeQuery } = router;
    const inOrganization = routeQuery.orgchannel || routeQuery.org;

    return (
        <CreateEntity
            hide={hide}
            myId={user ? user.id : ''}
            myOrgId={organization ? organization.id : ''}
            inOrgId={inOrganization}
            entityKind={EntityKind.COMMUNITY}
            selectOptions={[
                {
                    value: CommunityType.COMMUNITY_PUBLIC,
                    label: `Public community`,
                    labelShort: 'Public',
                    subtitle: `Anyone can find and join this community`,
                },
                {
                    value: CommunityType.COMMUNITY_PRIVATE,
                    label: `Private community`,
                    labelShort: 'Private',
                    subtitle: `Only invited people can join community and view chats`,
                },
            ]}
        />
    );
};

export const openCreateCommunityModal = () => {
    showModalBox(
        {
            fullScreen: true,
        },
        ctx => <CreateCommunityModal hide={ctx.hide} />,
    );
};
