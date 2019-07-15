import { SharedRoomKind } from 'openland-api/Types';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XRouter } from 'openland-x-routing/XRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { CreateEntity, EntityKind } from './createEntity';

const CreateGroupModal = ({ hide, entityKind }: { hide(): void; entityKind: EntityKind }) => {
    const { user, organization } = React.useContext(UserInfoContext)!;
    const router = React.useContext(XRouterContext) as XRouter;
    const { routeQuery } = router;
    const inOrganization = routeQuery.orgchannel || routeQuery.org;

    let chatTypeStr = entityKind.toLowerCase();
    return (
        <CreateEntity
            hide={hide}
            myId={user ? user.id : ''}
            myOrgId={organization ? organization.id : ''}
            inOrgId={inOrganization}
            entityKind={entityKind}
            selectOptions={[
                {
                    value: SharedRoomKind.GROUP,
                    label: `Secret ${chatTypeStr.toLocaleLowerCase()}`,
                    labelShort: 'Secret',
                    subtitle: `People can view and join only by invite from a ${chatTypeStr.toLocaleLowerCase()} member`,
                },
                {
                    value: SharedRoomKind.PUBLIC,
                    label: `Shared ${chatTypeStr.toLocaleLowerCase()}`,
                    labelShort: 'Shared',
                    subtitle: `${chatTypeStr} where your organization or community members communicate`,
                },
            ]}
        />
    );
};

export const openCreateGroupModal = (entityKind: EntityKind) => {
    showModalBox(
        {
            fullScreen: true,
        },
        ctx => <CreateGroupModal hide={ctx.hide} entityKind={entityKind} />,
    );
};
