import { UserInfoContext } from 'openland-web/components/UserInfo';
import { showModalBox } from 'openland-x/showModalBox';
import * as React from 'react';
import { CreateEntity, EntityKind } from './createEntity';

interface CreateOrganizationModalProps {
    org?: string;
    orgchannel?: string;
}

const CreateOrganizationModal = ({
    org,
    orgchannel,
    hide,
}: CreateOrganizationModalProps & { hide(): void }) => {
    const { user, organization } = React.useContext(UserInfoContext)!;
    const inOrganization = orgchannel || org;

    return (
        <CreateEntity
            hide={hide}
            myId={user ? user.id : ''}
            myOrgId={organization ? organization.id : ''}
            inOrgId={inOrganization}
            entityKind={org ? EntityKind.GROUP : EntityKind.CHANNEL}
        />
    );
};

export const openCreateOrganizationModal = (props: CreateOrganizationModalProps) => {
    showModalBox(
        {
            fullScreen: true,
        },
        ctx => <CreateOrganizationModal hide={ctx.hide} {...props} />,
    );
};
