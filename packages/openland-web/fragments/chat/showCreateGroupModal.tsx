import * as React from 'react';
import { showModalBox } from "openland-x/showModalBox";
import { CreateEntity, EntityKind } from 'openland-web/fragments/create/CreateEntity';
import { SharedRoomKind } from 'openland-api/Types';

export function showCreateGroupModal(type: 'group' | 'channel', orgId?: string) {
    showModalBox({ fullScreen: true }, (ctx) => {
        return (
            <CreateEntity
                ctx={ctx}
                entityKind={type === 'group' ? EntityKind.GROUP : EntityKind.CHANNEL}
                inOrgId={orgId}
                selectOptions={[
                    {
                        value: SharedRoomKind.GROUP,
                        label: `Secret ${type}`,
                        labelShort: 'Secret',
                        subtitle: `People can view and join only by invite from a ${type} member`,
                    },
                    {
                        value: SharedRoomKind.PUBLIC,
                        label: `Shared ${type}`,
                        labelShort: 'Shared',
                        subtitle: `${type} where your organization or community members communicate`,
                    },
                ]}
            />
        );
    });
}