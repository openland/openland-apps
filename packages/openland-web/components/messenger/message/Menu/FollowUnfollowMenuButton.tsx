import * as React from 'react';
import { CommentSubscriptionType } from 'openland-api/Types';
import { XMenuItem } from 'openland-x/XMenuItem';
import { useClient } from 'openland-web/utils/useClient';

export const FollowUnfollowMenuButton = ({
    isSubscribed,
    messageId,
    type = CommentSubscriptionType.ALL,
}: {
    isSubscribed: boolean;
    messageId: string;
    type?: CommentSubscriptionType;
}) => {
    const client = useClient();

    return (
        <XMenuItem
            onClick={async () => {
                if (isSubscribed) {
                    await client.mutateUnSubscribeMessageComments({
                        messageId,
                    });
                } else {
                    await client.mutateSubscribeMessageComments({
                        messageId,
                        type,
                    });
                }

                await client.refetchMyNotifications({
                    first: 100,
                });
            }}
        >
            {isSubscribed ? 'Unfollow this thread' : 'Follow this thread'}
        </XMenuItem>
    );
};
