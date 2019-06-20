import * as React from 'react';
import { CommentSubscriptionType } from 'openland-api/Types';
import { XMenuItem } from 'openland-x/XMenuItem';
import { useClient } from 'openland-web/utils/useClient';

export const FollowUnfollowMenuButton = ({
    isSubscribedMessageComments,
    messageId,
    type = CommentSubscriptionType.ALL,
}: {
    isSubscribedMessageComments: boolean;
    messageId: string;
    type?: CommentSubscriptionType;
}) => {
    const client = useClient();

    return (
        <XMenuItem
            onClick={async () => {
                if (isSubscribedMessageComments) {
                    await client.mutateUnSubscribeMessageComments({
                        messageId,
                    });
                } else {
                    await client.mutateSubscribeMessageComments({
                        messageId,
                        type,
                    });
                }
            }}
        >
            {isSubscribedMessageComments ? 'Unfollow thread' : 'Follow thread'}
        </XMenuItem>
    );
};
