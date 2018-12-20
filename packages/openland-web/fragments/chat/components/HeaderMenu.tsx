import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/Incubator/XOverflow';
import { Room_room_SharedRoom } from 'openland-api/Types';

export const HeaderMenu = (props: { room: Room_room_SharedRoom }) => (
    <XOverflow
        flat={true}
        placement="bottom-end"
        content={
            <>
                <XWithRole
                    role="super-admin"
                    or={props.room.role === 'OWNER' || props.room.role === 'ADMIN'}
                >
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
                        value: props.room.id,
                    }}
                    style="danger"
                >
                    Leave room
                </XMenuItem>
                <XWithRole role="super-admin">
                    <XMenuItemSeparator />
                    <AdminTools id={props.room.id} variables={{ id: props.room.id }} />
                </XWithRole>
            </>
        }
    />
);
