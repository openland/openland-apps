import * as React from 'react';
import { CommentSubscriptionType } from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import { PinButtonStyle } from './PinMessageButton';
import { XMutation } from 'openland-x/XMutation';
import { MutationFunc } from 'react-apollo';

export const FollowUnfollowMenuButton = ({
    isSubscribedMessageComments,
    messageId,
    type = CommentSubscriptionType.ALL,
    onSuccess,
}: {
    isSubscribedMessageComments: boolean;
    messageId: string;
    type?: CommentSubscriptionType;
    onSuccess: () => void;
}) => {
    const client = useClient();

    let followResolver = null;

    if (isSubscribedMessageComments) {
        followResolver = async () =>
            await client.mutateUnSubscribeMessageComments({
                messageId,
            });
    } else {
        followResolver = async () =>
            await client.mutateSubscribeMessageComments({
                messageId,
                type,
            });
    }

    return (
        <XMutation mutation={followResolver as MutationFunc} onSuccess={onSuccess}>
            <PinButtonStyle
                text={isSubscribedMessageComments ? 'Unfollow this thread' : 'Follow this thread'}
            />
        </XMutation>
    );
};
