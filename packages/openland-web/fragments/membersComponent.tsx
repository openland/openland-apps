import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XModalHeader, XModalTitle } from 'openland-x-modal/XModal';
import CloseIcon from 'openland-icons/ic-close-1.svg';
import { XText } from 'openland-x/XText';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XView } from 'react-mental';

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
            <XPopper
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
            </XPopper>
        );
    }
}

const RemoveMemberModalInner = ({ roomId, roomTitle }: { roomId: string; roomTitle: string }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const data = client.useRoomMemberShort({
        roomId,
        memberId: router.query.remove,
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
            targetQuery="remove"
            defaultAction={async () => {
                await client.mutateRoomKick({
                    userId: member.user.id,
                    roomId,
                });

                await client.refetchRoom({
                    id: roomId,
                });
            }}
        >
            <XText>
                Are you sure you want to remove {member.user.firstName}? They will no longer be able
                to participate in the discussion.
            </XText>
        </XModalForm>
    );
};

export const RemoveMemberModal = ({ roomId, roomTitle }: { roomId: string; roomTitle: string }) => {
    let router = React.useContext(XRouterContext)!;

    if (!router.query.remove) {
        return null;
    }
    return (
        <React.Suspense
            fallback={
                <XView
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    backgroundColor="rgba(0, 0, 0, 0.4)"
                    position="fixed"
                    zIndex={100}
                />
            }
        >
            <RemoveMemberModalInner roomId={roomId} roomTitle={roomTitle} />{' '}
        </React.Suspense>
    );
};
