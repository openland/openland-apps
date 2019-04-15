import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/components/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/XOverflow';
import { RoomWithoutMembers_room_SharedRoom } from 'openland-api/Types';
import { checkCanSeeAdvancedSettings } from 'openland-y-utils/checkCanSeeAdvancedSettings';

export const HeaderMenu = ({ room }: { room: RoomWithoutMembers_room_SharedRoom }) => {
    const { id, canEdit } = room;

    const canSeeAdvancedSettings = checkCanSeeAdvancedSettings({ chat: room });
    return (
        <XOverflow
            flat={true}
            small={true}
            placement="bottom-end"
            content={
                <>
                    <XWithRole role="super-admin" or={canEdit}>
                        <XMenuItem
                            query={{
                                field: 'editChat',
                                value: 'true',
                            }}
                        >
                            Settings
                        </XMenuItem>
                    </XWithRole>

                    <XMenuItem
                        query={{
                            field: 'leaveFromChat',
                            value: id,
                        }}
                        style="danger"
                    >
                        Leave group
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
                </>
            }
        />
    );
};
