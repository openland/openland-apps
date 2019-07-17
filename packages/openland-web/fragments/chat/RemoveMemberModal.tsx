import * as React from 'react';
import Glamorous from 'glamorous';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XLink } from 'openland-x/XLink';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import CloseIcon from 'openland-icons/ic-close-1.svg';
import { XText } from 'openland-x/XText';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';

const DeclineButtonWrapper = Glamorous(XLink)<{ isHoveredWrapper?: boolean }>([
    {
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,

        '& svg': {
            fill: '#bcc3cc',
        },
    },
    props =>
        props.isHoveredWrapper
            ? {
                  opacity: 1,
              }
            : {},
]);

class DeclineButton extends React.Component<{
    isHoveredWrapper?: boolean;
    userId: string;
}> {
    render() {
        return (
            <XPolitePopper
                content="Decline request"
                showOnHover={true}
                placement="top-end"
                style="dark"
                padding={1}
            >
                <DeclineButtonWrapper
                    isHoveredWrapper={this.props.isHoveredWrapper}
                    query={{ field: 'remove', value: this.props.userId }}
                >
                    <CloseIcon />
                </DeclineButtonWrapper>
            </XPolitePopper>
        );
    }
}

interface RemoveMemberModalProps {
    roomId: string;
    roomTitle: string;
    memberId: string;
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

    return (
        <XModalForm
            submitProps={{
                text: 'Remove',
                style: 'danger',
            }}
            title={'Remove ' + member.user.name + ' from ' + roomTitle}
            ignoreTargetQuery
            defaultAction={async () => {
                await client.mutateRoomKick({
                    userId: member.user.id,
                    roomId,
                });

                await client.refetchRoom({
                    id: roomId,
                });

                hide();
            }}
            onClosed={() => {
                hide();
            }}
        >
            <XText>
                Are you sure you want to remove {member.user.firstName}? They will no longer be able
                to participate in the discussion.
            </XText>
        </XModalForm>
    );
};

export const showRemoveMemberModal = (props: RemoveMemberModalProps) => {
    showModalBox({}, ctx => <RemoveMemberModalInner {...props} hide={ctx.hide} />);
};
