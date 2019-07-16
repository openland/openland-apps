import * as React from 'react';
import { XMutation } from 'openland-x/XMutation';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';
import { XButton } from 'openland-x/XButton';

export const DeleteMessageButton = ({
    msgId,
    onSuccess,
}: {
    msgId: string;
    onSuccess: () => void;
}) => {
    const client = useClient();
    const pinMessage = async () => await client.mutateRoomDeleteMessages({ mids: [msgId] });

    return (
        <XMutation mutation={pinMessage as MutationFunc} onSuccess={onSuccess}>
            <XButton text="Delete" style="danger" />
        </XMutation>
    );
};
