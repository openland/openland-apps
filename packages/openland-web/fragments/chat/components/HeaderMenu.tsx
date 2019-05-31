import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/components/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/XOverflow';
import { RoomHeader_room_SharedRoom } from 'openland-api/Types';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { LeaveChatComponent } from 'openland-web/fragments/MessengerRootComponent';
import { RoomEditModalBody } from 'openland-web/fragments/chat/RoomEditModal';

export const HeaderMenu = ({ room }: { room: RoomHeader_room_SharedRoom }) => {
    const { id, canEdit } = room;

    const canSeeAdvancedSettings = checkCanSeeAdvancedSettings({ chat: room });
    const sharedRoom =
        room.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);
    return (
        <XOverflow
            flat={true}
            small={true}
            placement="bottom-end"
            width={152}
            content={
                <React.Suspense fallback={<XLoader loading={true} />}>
                    <XWithRole role="super-admin" or={canEdit}>
                        <XMenuItem
                            onClick={() =>
                                showModalBox(
                                    { title: isChannel ? 'Channel settings' : 'Group settings' },
                                    ctx => (
                                        <RoomEditModalBody
                                            roomId={id}
                                            title={room.title}
                                            photo={room.photo}
                                            description={room.description}
                                            socialImage={room.socialImage}
                                            isChannel={room.isChannel}
                                            onClose={ctx.hide}
                                        />
                                    ),
                                )
                            }
                        >
                            Settings
                        </XMenuItem>
                    </XWithRole>

                    <XMenuItem
                        style="danger"
                        onClick={() =>
                            showModalBox({ title: 'Leave the chat' }, ctx => (
                                <LeaveChatComponent id={id} ctx={ctx} />
                            ))
                        }
                    >
                        {isChannel ? 'Leave channel' : 'Leave group'}
                    </XMenuItem>
                    <XWithRole role="super-admin" or={canSeeAdvancedSettings}>
                        <XMenuItemSeparator />
                        <XMenuItem
                            query={{
                                field: 'advancedSettings',
                                value: 'true',
                            }}
                        >
                            Advanced settings
                        </XMenuItem>
                        <XWithRole role="super-admin">
                            <AdminTools id={id} variables={{ id }} />
                        </XWithRole>
                    </XWithRole>
                </React.Suspense>
            }
        />
    );
};
