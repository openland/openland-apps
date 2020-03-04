import * as React from 'react';
import {
    RoomFullWithoutMembers_SharedRoom,
    RoomMembersPaginated_members,
} from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { MenuItem, UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { showLeaveChatConfirmation } from 'openland-web/fragments/account/components/groupProfileModals';
import { OpenlandClient } from 'openland-api/spacex';
import { useClient } from 'openland-api/useClient';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XView, XViewRouterContext, XViewRouter } from 'react-mental';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { showModalBox } from 'openland-x/showModalBox';

const MakeFeaturedModal = (props: { ctx: XModalController; roomId: string; userId: string }) => {
    const { ctx, roomId, userId } = props;
    const client = useClient();
    const form = useForm();
    const userBadge = client.useSuperBadgeInRoom(
        { roomId, userId },
        { fetchPolicy: 'cache-and-network' },
    ).superBadgeInRoom;
    const [featured, setFeatured] = React.useState<boolean>(!!userBadge);
    const descriptionField = useField('input.description', userBadge ? userBadge.name : '', form, [
        {
            checkIsValid: value => value.trim().length > 0,
            text: "Description can't be empty",
        },
        {
            checkIsValid: value => value.trim().length <= 40,
            text: 'Max length: 40 characters',
        },
    ]);

    const onSave = () => {
        form.doAction(async () => {
            if (featured) {
                await client.mutateSuperBadgeCreateToRoom({
                    name: descriptionField.value,
                    userId,
                    roomId,
                });
            } else {
                if (userBadge) {
                    await client.mutateSuperBadgeUnsetToRoom({
                        userId,
                        roomId,
                        badgeId: userBadge.id,
                    });
                }
            }

            ctx.hide();
        });
    };

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                <XModalContent>
                    <UCheckbox
                        label={featured ? 'Featured' : 'Not featured'}
                        checked={featured}
                        onChange={() => setFeatured(!featured)}
                        asSwitcher={true}
                    />
                    {featured && (
                        <XView marginTop={20}>
                            <UInputField
                                label="Description"
                                field={descriptionField}
                                maxLength={40}
                            />
                        </XView>
                    )}
                </XModalContent>
                <XModalFooter>
                    <UButton
                        text="Cancel"
                        style="tertiary"
                        size="large"
                        onClick={() => ctx.hide()}
                    />
                    <UButton text="Save" style="primary" size="large" onClick={onSave} />
                </XModalFooter>
            </XView>
        </>
    );
};

export const showMakeFeaturedModal = (roomId: string, userId: string) => {
    showModalBox(
        {
            title: 'Member featuring',
        },
        ctx => {
            return <MakeFeaturedModal ctx={ctx} userId={userId} roomId={roomId} />;
        },
    );
};

interface GroupMemberMenuProps {
    group: RoomFullWithoutMembers_SharedRoom;
    member: RoomMembersPaginated_members;
    onRemove: (memberId: string) => void;
}

const getMenuContent = (
    opts: GroupMemberMenuProps & { client: OpenlandClient; router: XViewRouter },
) => {
    const res: MenuItem[] = [];

    const { group, member, onRemove, client, router } = opts;
    const { id, isChannel } = group;
    const { user, badge, canKick } = member;

    const typeString = isChannel ? 'channel' : 'group';

    if (AppConfig.isSuperAdmin()) {
        res.push({
            title: badge ? 'Edit featured status' : 'Make featured',
            icon: <StarIcon />,
            onClick: () => showMakeFeaturedModal(id, user.id),
        });
    }

    if (user.isYou) {
        res.push({
            title: `Leave ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => showLeaveChatConfirmation(client, id, router),
        });
    }

    if (!user.isYou && canKick) {
        res.push({
            title: `Remove from ${typeString}`,
            icon: <LeaveIcon />,
            onClick: () => {
                const builder = new AlertBlanketBuilder();

                builder.title(`Remove ${user.name} from ${group.title}`);
                builder.message(
                    `Are you sure you want to remove ${
                        user.firstName
                    }? They will no longer be able to participate in the discussion.`,
                );
                builder.action(
                    `Remove`,
                    async () => {
                        await client.mutateRoomKick({
                            userId: user.id,
                            roomId: group.id,
                        });

                        await client.refetchRoomWithoutMembers({ id: group.id });
                        await client.refetchRoomMembersShort({ roomId: id });

                        onRemove(user.id);
                    },
                    'danger',
                );

                builder.show();
            },
        });
    }

    return res;
};

const MenuComponent = React.memo((props: { ctx: UPopperController; items: MenuItem[] }) =>
    new UPopperMenuBuilder().items(props.items).build(props.ctx),
);

export const GroupMemberMenu = React.memo((props: GroupMemberMenuProps) => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    const menuContent = getMenuContent({ ...props, client, router });

    if (menuContent.length <= 0) {
        return null;
    }

    return <UMoreButton menu={ctx => <MenuComponent ctx={ctx} items={menuContent} />} />;
});
