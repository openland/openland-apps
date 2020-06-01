import * as React from 'react';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-api/useClient';
import { DiscussionEditComponent } from './components/DiscussionEditComponent';

export const DiscussionEditorFragment = React.memo(() => {
    const unicorn = useUnicorn();
    const { id } = unicorn.query;
    const client = useClient();
    let discussion = client.useDiscussionDraft({ id }, { fetchPolicy: 'network-only' }).discussionDraft;
    if (!discussion) {
        throw Error('Unknown error');
    }
    return (<DiscussionEditComponent data={discussion} />);
});