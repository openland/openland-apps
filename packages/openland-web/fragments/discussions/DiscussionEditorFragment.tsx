import * as React from 'react';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-api/useClient';

export const DiscussionEditorFragment = React.memo(() => {
    const unicorn = useUnicorn();
    const { id } = unicorn.query;
    const client = useClient();
    return null;
});