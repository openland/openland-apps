import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { DiscussionComponent } from './components/DiscussionComponent';
import { CommentsWrapper } from 'openland-web/components/comments/CommentsWrapper';

export const DiscussionFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const post = client.usePost({ id: props.id }).post!;
    return (
        <CommentsWrapper
            peerId={post.id}
            peerView={<DiscussionComponent data={post} />}
        />
    );
});