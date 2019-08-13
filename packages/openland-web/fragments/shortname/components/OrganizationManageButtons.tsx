import * as React from 'react';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { showEditCommunityModal } from 'openland-web/fragments/account/components/showEditCommunityModal';
import { useRole } from 'openland-x-permissions/XWithRole';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';

interface OrganizationManageButtonsProps {
    organization: OrganizationWithoutMembers_organization;
    onLeave: (id: string) => void;
}

const MenuComponent = React.memo((props: OrganizationManageButtonsProps & { ctx: UPopperController }) => {
    const messenger = React.useContext(MessengerContext);
    const { ctx, organization, onLeave } = props;
    const { id, isCommunity, isOwner, isAdmin, isMine, shortname } = organization;

    const typeString = isCommunity ? 'community' : 'organization';
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => copy(`https://openland.com/${shortname || id}`)
    });

    if (isOwner || isAdmin) {
        builder.item({
            title: 'Edit',
            icon: <EditIcon />,
            onClick: () => showEditCommunityModal(id, isCommunity, isOwner)
        });
    }

    if (useRole('super-admin')) {
        builder.item({
            title: 'Super edit',
            icon: <EditIcon />,
            path: `/super/orgs/${id}`
        });
    }

    if (isMine) {
        builder.item({
            title: `Leave ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => showLeaveConfirmation(organization, messenger, onLeave)
        });
    }

    return builder.build(ctx);
});

export const OrganizationManageButtons = React.memo((props: OrganizationManageButtonsProps) => {
    return (
        <UMoreButton menu={ctx => <MenuComponent {...props} ctx={ctx} />} />
    );
});