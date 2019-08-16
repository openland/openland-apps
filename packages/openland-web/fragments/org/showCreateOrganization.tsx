import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { CreateEntity, EntityKind, CommunityType } from 'openland-web/fragments/create/CreateEntity';

export function showCreateOrganization(type: 'organization' | 'community') {
    showModalBox({ fullScreen: true }, (ctx) => (
        <CreateEntity
            ctx={ctx}
            entityKind={type === 'organization' ? EntityKind.ORGANIZATION : EntityKind.COMMUNITY}
            selectOptions={type === 'community' ? [
                {
                    value: CommunityType.COMMUNITY_PUBLIC,
                    label: 'Public community',
                    labelShort: 'Public',
                    subtitle: 'Anyone can find and join this community',
                },
                {
                    value: CommunityType.COMMUNITY_PRIVATE,
                    label: 'Private community',
                    labelShort: 'Private',
                    subtitle: 'Only invited people can join community and view chats',
                },
            ] : undefined}
        />
    ));
}