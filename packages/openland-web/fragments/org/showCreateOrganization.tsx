import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { CreateEntity, EntityKind } from 'openland-web/fragments/create/CreateEntity';

export function showCreateOrganization(type: 'organization' | 'community') {
    showModalBox({ fullScreen: true }, (ctx) => (
        <CreateEntity
            ctx={ctx}
            entityKind={type === 'organization' ? EntityKind.ORGANIZATION : EntityKind.COMMUNITY}
        />
    ));
}