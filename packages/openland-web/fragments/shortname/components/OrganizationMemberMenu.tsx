import * as React from 'react';
import { OrganizationMembers_organization_members, OrganizationWithoutMembers_organization, OrganizationMemberRole } from 'openland-api/Types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder, MenuItem } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { useClient } from 'openland-web/utils/useClient';

interface MenuContentOpts {
    organization: OrganizationWithoutMembers_organization;
    memberRef: React.MutableRefObject<OrganizationMembers_organization_members>;
    onRemove: (memberId: string) => void;
    onChangeRole: (memberId: string, newRole: OrganizationMemberRole) => void;
    client: OpenlandClient;
}

const getMenuContent = (opts: MenuContentOpts) => {
    const res: MenuItem[] = [];

    const { organization, onRemove, onChangeRole, client, memberRef } = opts;
    const { id, name, isOwner, isAdmin, isCommunity } = organization;
    const { user, role } = memberRef.current;

    const typeString = isCommunity ? 'community' : 'organization';

    if (!user.isYou && isOwner) {
        res.push({
            title: role === 'MEMBER' ? 'Make admin' : 'Revoke admin status',
            icon: <StarIcon />,
            action: async () => {
                const newRole = role === 'MEMBER' ? OrganizationMemberRole.ADMIN : OrganizationMemberRole.MEMBER;

                await client.mutateOrganizationChangeMemberRole({
                    memberId: user.id,
                    organizationId: id,
                    newRole,
                });

                await client.refetchOrganization({ organizationId: id });

                onChangeRole(user.id, newRole);
            }
        });
    }

    if (user.isYou && !isOwner) {
        res.push({
            title: `Leave ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => {
                const builder = new AlertBlanketBuilder;

                builder.title(`Leave ${typeString}`);
                builder.message(`Are you sure you want to leave? You will lose access to all internal chats at ${name}. You can only join ${name} by invitation in the future.`);
                builder.action(`Leave`, async () => {
                    await client.mutateOrganizationMemberRemove({
                        userId: user.id,
                        organizationId: id,
                    });

                    await client.refetchMyOrganizations();
                    await client.refetchAccount();

                    onRemove(user.id);
                }, 'danger');

                builder.show();
            }
        });
    }

    if (!user.isYou && (isOwner || isAdmin) && role !== OrganizationMemberRole.OWNER) {
        res.push({
            title: `Remove from ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => {
                const builder = new AlertBlanketBuilder;

                builder.title(`Remove ${user.name} from ${name}`);
                builder.message(`Are you sure you want to remove ${user.name}? They will be removed from all internal chats at ${name}.`);
                builder.action(`Remove from ${typeString}`, async () => {
                    await client.mutateOrganizationRemoveMember({
                        memberId: user.id,
                        organizationId: id,
                    });

                    await client.refetchOrganization({ organizationId: id });

                    onRemove(user.id);
                }, 'danger');

                builder.show();
            }
        });
    }

    return res;
};

const MenuComponent = React.memo((props: { ctx: UPopperController, items: MenuItem[] }) => (
    new UPopperMenuBuilder().items(props.items).build(props.ctx)
));

interface OrganizationMemberMenuProps {
    organization: OrganizationWithoutMembers_organization;
    member: OrganizationMembers_organization_members;
    onRemove: (memberId: string) => void;
    onChangeRole: (memberId: string, newRole: OrganizationMemberRole) => void;
}

export const OrganizationMemberMenu = React.memo((props: OrganizationMemberMenuProps) => {
    const client = useClient();
    const { organization, member, onRemove, onChangeRole } = props;

    // Sorry universe
    const memberRef = React.useRef(member);
    memberRef.current = member;

    const menuContent = getMenuContent({ organization, memberRef, onRemove, onChangeRole, client });

    if (menuContent.length <= 0) {
        return null;
    }

    return (
        <UMoreButton
            menu={ctx => (
                <MenuComponent
                    ctx={ctx}
                    items={getMenuContent({ organization, memberRef, onRemove, onChangeRole, client })}
                />
            )}
        />
    );
});