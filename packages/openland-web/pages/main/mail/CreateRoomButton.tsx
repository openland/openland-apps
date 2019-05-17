import * as React from 'react';
import { SharedRoomKind } from 'openland-api/Types';
import { XMutation } from 'openland-x/XMutation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';

interface CreateRoomButtonProps {
    title: string;
    kind: SharedRoomKind;
    members: string[];
    organizationId: string | null;
    imageUuid: string | null;
    isChannel: boolean;
    children: any;
}

export const CreateRoomButton = (props: CreateRoomButtonProps) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let photoRef: { uuid: string } | null;
    if ((props as any).imageUuid) {
        photoRef = {
            uuid: (props as any).imageUuid,
        };
    }

    return (
        <XMutation
            action={async () => {
                const returnedData = await client.mutateRoomCreate({
                    title: props.title,
                    kind: props.kind,
                    members: [...props.members],
                    organizationId: props.organizationId || '',
                    photoRef: photoRef,
                    channel: (props as any).isChannel,
                });

                const roomId: string = returnedData.room.id as string;
                router.replace('/mail/' + roomId);
            }}
        >
            {props.children}
        </XMutation>
    );
};
