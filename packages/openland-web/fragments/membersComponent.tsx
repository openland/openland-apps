import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import CloseIcon from 'openland-icons/ic-close-1.svg';
import { XText } from 'openland-x/XText';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

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

export const RemoveMemberModal = (props: { roomId: string }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    return null;

    // let member = props.members.filter(
    //     (m: any) => (m.user && m.user.id === router.query.remove) || '',
    // )[0];

    // if (!member) {
    //     return null;
    // }
    // return (
    //     <XModalForm
    //         submitProps={{
    //             text: 'Remove',
    //             style: 'danger',
    //         }}
    //         title={'Remove ' + member.user.name + ' from ' + props.roomTitle}
    //         targetQuery="remove"
    //         defaultAction={async () => {
    //             await client.mutateRoomKick({
    //                 userId: member.user.id,
    //                 roomId: props.roomId,
    //             });

    //             await client.refetchRoom({
    //                 id: props.roomId,
    //             });
    //         }}
    //     >
    //         <XText>
    //             Are you sure you want to remove {member.user.firstName}? They will no longer be able
    //             to participate in the discussion.
    //         </XText>
    //     </XModalForm>
    // );
};
