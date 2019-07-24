import * as React from 'react';
import { XText } from 'openland-x/XText';
import { useClient } from 'openland-web/utils/useClient';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';

interface RemoveMemberModalProps {
    roomId: string;
    roomTitle: string;
    memberId: string;
    memberName: string;
}

const RemoveMemberModalInner = ({
    roomId,
    roomTitle,
    memberId,
    hide,
}: RemoveMemberModalProps & { hide: () => void }) => {
    const client = useClient();
    const data = client.useRoomMemberShort({
        roomId,
        memberId,
    });

    const member = data && data.member ? data.member : null;
    if (!member) {
        return null;
    }

    // remove, danger

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XView marginTop={30} />
                <XText>
                    Are you sure you want to remove {member.user.firstName}? They will no longer be
                    able to participate in the discussion.
                </XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Remove"
                    style="danger"
                    size="large"
                    onClick={async () => {
                        await client.mutateRoomKick({
                            userId: member.user.id,
                            roomId,
                        });

                        await client.refetchRoom({
                            id: roomId,
                        });

                        hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showRemoveMemberModal = (props: RemoveMemberModalProps) => {
    showModalBox(
        {
            title: 'Remove ' + props.memberName + ' from ' + props.roomTitle,
        },
        ctx => <RemoveMemberModalInner {...props} hide={ctx.hide} />,
    );
};
