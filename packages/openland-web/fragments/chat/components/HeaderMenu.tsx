import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/components/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/XOverflow';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { UserInfoContext } from 'openland-web/components/UserInfo';

export const HeaderMenu = ({ room }: { room: Room_room_SharedRoom }) => {
    let ctx = React.useContext(UserInfoContext);
    const myUserId = ctx!!.user!!.id;

    const { id, canEdit } = room;

    const canChangeAdvancedSettingsMembersUsers = getWelcomeMessageSenders({
        chat: room,
    });

    const canSeeAdvancedSettings =
        canChangeAdvancedSettingsMembersUsers
            .filter((item: { id: string }) => item.id)
            .indexOf(myUserId) !== -1;

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
                    <XMenuItemSeparator />
                    <XWithRole role="super-admin" or={canSeeAdvancedSettings}>
                        <XMenuItem
                            query={{
                                field: 'advancedSettings',
                                value: 'true',
                            }}
                        >
                            Advanced settings
                        </XMenuItem>
                    </XWithRole>
                    <XWithRole role="super-admin">
                        <AdminTools id={id} variables={{ id }} />
                    </XWithRole>
                </>
            }
        />
    );
};
