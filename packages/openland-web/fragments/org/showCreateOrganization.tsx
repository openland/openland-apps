import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { CreateEntity, EntityKind, CommunityType } from 'openland-web/fragments/create/CreateEntity';
import { XViewRouter } from 'react-mental';

interface CreateOrganizationOpts {
    type: 'organization' | 'community';
    router?: XViewRouter;
}

export function showCreateOrganization(opts: CreateOrganizationOpts) {
    const { type, router } = opts;

    showModalBox({ fullScreen: true }, (ctx) => (
        <CreateEntity
            ctx={ctx}
            entityKind={type === 'organization' ? EntityKind.ORGANIZATION : EntityKind.COMMUNITY}
            router={router}
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