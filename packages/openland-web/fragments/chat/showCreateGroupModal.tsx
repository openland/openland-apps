import * as React from 'react';
import { showModalBox } from "openland-x/showModalBox";
import { CreateEntity, EntityKind } from 'openland-web/fragments/create/CreateEntity';
import { SharedRoomKind } from 'openland-api/Types';
import { XViewRouter } from 'react-mental';

interface CreateGroupModalOpts {
    type: 'group' | 'channel';
    orgId?: string;
    router?: XViewRouter;
}

export function showCreateGroupModal(opts: CreateGroupModalOpts) {
    const { type, orgId, router } = opts;

    showModalBox({ fullScreen: true }, (ctx) => {
        return (
            <CreateEntity
                ctx={ctx}
                entityKind={type === 'group' ? EntityKind.GROUP : EntityKind.CHANNEL}
                inOrgId={orgId}
                router={router}
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