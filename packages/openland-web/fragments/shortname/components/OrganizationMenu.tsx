import * as React from 'react';
import { Organization_organization } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { showLeaveConfirmation } from 'openland-web/fragments/org/showLeaveConfirmation';
import { showEditCommunityModal } from 'openland-web/fragments/account/components/showEditCommunityModal';
import { useRole } from 'openland-x-permissions/XWithRole';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { useStackRouter, StackRouter } from 'openland-unicorn/components/StackRouter';
import { useToast, UToastHandlers } from 'openland-web/components/unicorn/UToast';

interface OrganizationMenuProps {
    organization: Organization_organization;
    onLeave: (id: string) => void;
}

const MenuComponent = React.memo((props: OrganizationMenuProps & { ctx: UPopperController, router: StackRouter, toastHandlers: UToastHandlers }) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const { ctx, router, organization, onLeave, toastHandlers } = props;
    const { id, name, isCommunity, isOwner, isAdmin, isMine, shortname } = organization;

    const typeString = isCommunity ? 'community' : 'organization';
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => {
            copy(`https://openland.com/${shortname || id}`);

            toastHandlers.show({
                type: 'success',
                text: 'Link copied',
            });
        }
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

    if (isOwner || isAdmin) {
        builder.item({
            title: `Delete ${typeString}`,
            icon: <DeleteIcon />,
            onClick: () => {
                AlertBlanket.builder()
                    .title(`Delete ${name}`)
                    .message(`Are you sure you want to delete ${name}? This cannot be undone.`)
                    .action('Delete', async () => {
                        await client.mutateDeleteOrganization({ organizationId: organization.id });
                        await client.refetchAccountSettings();

                        router.pop();
                    }, 'danger').show();
            }
        });
    }

    return builder.build(ctx);
});

export const OrganizationMenu = React.memo((props: OrganizationMenuProps) => {
    const router = useStackRouter();
    const toastHandlers = useToast();

    return (
        <UMoreButton
            marginRight={-8}
            menu={ctx => <MenuComponent {...props} router={router} ctx={ctx} toastHandlers={toastHandlers} />}
        />
    );
});