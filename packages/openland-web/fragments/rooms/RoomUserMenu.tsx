import * as React from 'react';
import { XViewRouterContext } from 'react-mental';

import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import IcUser from 'openland-icons/s/ic-user-24.svg';
import IcEdit from 'openland-icons/s/ic-edit-24.svg';
import IcListener from 'openland-icons/s/ic-listener-24.svg';
import IcFollow from 'openland-icons/s/ic-invite-24.svg';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcSpeaker from 'openland-icons/s/ic-mic-24.svg';
import IcCrown from 'openland-icons/s/ic-pro-24.svg';
import IcCrownOff from 'openland-icons/s/ic-pro-off-24.svg';
import IcLeave from 'openland-icons/s/ic-leave-24.svg';

interface RoomUserMenuProps {
    ctx: UPopperController;
    roomId: string;
    userId: string;
    status: VoiceChatParticipantStatus;
    selfStatus?: VoiceChatParticipantStatus;
    isSelf: boolean;
}

export const RoomUserMenu = React.memo((props: RoomUserMenuProps) => {
    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const isFollowed = !!client.useVoiceChatUser({ uid: props.userId }, { suspense: false })?.user
        .followedByMe;
    let popper = new UPopperMenuBuilder();
    const width = 200;

    popper.item({
        title: 'View profile',
        icon: <IcUser />,
        action: () => {
            router.navigate(`/${props.userId}`);
        },
    });

    if (props.isSelf) {
        popper.item({
            title: 'Edit profile',
            icon: <IcEdit />,
            action: () => {
                router.navigate(`/settings/profile`);
            },
        });

        if (props.status === VoiceChatParticipantStatus.SPEAKER) {
            popper.item({
                title: 'Become listener',
                icon: <IcListener />,
                action: async () => {
                    try {
                        await client.mutateVoiceChatDemote({
                            id: props.roomId,
                            uid: props.userId,
                        });
                    } catch (e) {
                        console.error(e);
                    }
                },
            });
        }

        return popper.build(props.ctx, width);
    }

    if (!isFollowed) {
        popper.item({
            title: 'Follow',
            icon: <IcFollow />,
            action: async () => {
                await client.mutateSocialFollow({ uid: props.userId });
                await client.refetchVoiceChatUser({ uid: props.userId });
            },
        });
    }

    if (
        props.selfStatus === VoiceChatParticipantStatus.SPEAKER ||
        props.selfStatus === VoiceChatParticipantStatus.LISTENER
    ) {
        popper.item({
            title: 'Message',
            icon: <IcMessage />,
            action: async () => {
                router.navigate(`/mail/${props.userId}`);
            },
        });
    }

    if (props.selfStatus === VoiceChatParticipantStatus.ADMIN) {
        if (props.status === VoiceChatParticipantStatus.LISTENER) {
            popper.item({
                title: 'Make speaker',
                icon: <IcSpeaker />,
                action: async () => {
                    await client.mutateVoiceChatPromote({
                        id: props.roomId,
                        uid: props.userId,
                    });
                },
            });
        }
        if (props.status === VoiceChatParticipantStatus.SPEAKER) {
            popper
                .item({
                    title: 'Make admin',
                    icon: <IcCrown />,
                    action: async () => {
                        await client.mutateVoiceChatUpdateAdmin({
                            id: props.roomId,
                            uid: props.userId,
                            admin: true,
                        });
                    },
                })
                .item({
                    title: 'Make listener',
                    icon: <IcListener />,
                    action: async () => {
                        await client.mutateVoiceChatDemote({
                            id: props.roomId,
                            uid: props.userId,
                        });
                    },
                });
        }

        if (props.status === VoiceChatParticipantStatus.ADMIN) {
            popper.item({
                title: 'Remove admin',
                icon: <IcCrownOff />,
                action: async () => {
                    await client.mutateVoiceChatUpdateAdmin({
                        id: props.roomId,
                        uid: props.userId,
                        admin: false,
                    });
                },
            });
        }

        popper.item({
            title: 'Remove',
            icon: <IcLeave />,
            action: async () => {
                await client.mutateVoiceChatKick({ id: props.roomId, uid: props.userId });
            },
        });
    }

    return popper.build(props.ctx, width);
});
