import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { withConversationKick } from 'openland-web/api/withConversationKick';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import CloseIcon from 'openland-icons/ic-close-1.svg';
import { XText } from 'openland-x/XText';

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

export const RemoveMemberModal = withConversationKick(props => {
    let member = (props as any).members.filter(
        (m: any) => (m.user && m.user.id === props.router.query.remove) || '',
    )[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            submitProps={{
                text: 'Remove',
                style: 'danger',
            }}
            title={'Remove ' + member.user.name + ' from ' + (props as any).roomTitle}
            targetQuery="remove"
            defaultAction={async data => {
                await props.kick({
                    variables: {
                        userId: member.user.id,
                        roomId: (props as any).roomId,
                    },
                });
            }}
        >
            <XText>
                Are you sure you want to remove {member.user.firstName}? They will no longer be able
                to participate in the discussion.
            </XText>
        </XModalForm>
    );
}) as React.ComponentType<{
    members: any[];
    roomId: string;
    roomTitle: string;
}>;
