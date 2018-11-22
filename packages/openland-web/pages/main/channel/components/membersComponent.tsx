import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XButton } from 'openland-x/XButton';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XPopper } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { withChannelMembers } from '../../../../api/withChannelMembers';
import { UserShort, RoomMembers, SharedRoomMembershipStatus, RoomFull_SharedRoom_members, Room_room_SharedRoom_members } from 'openland-api/Types';
import { XLoader } from 'openland-x/XLoader';
import { XMutation } from 'openland-x/XMutation';
import { withConversationKick } from '../../../../api/withConversationKick';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { EmptyComponent } from './membersEmptyComponent';
import CloseIcon from './icons/ic-close-1.svg';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XText } from 'openland-x/XText';
import { withRoomAddMembers } from '../../../../api/withRoomAddMembers';

const MembersWrapper = Glamorous(XScrollView2)({
    height: '100%',
    width: '100%'
});

const AboutText = Glamorous.div({
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: -0.4,
    color: '#5c6a81',
    padding: '18px 24px',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
});

const DeclineButtonWrapper = Glamorous(XLink)<{ isHoveredWrapper?: boolean }>([
    {
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: .5,

        '& svg': {
            fill: '#bcc3cc'
        }
    },
    (props) => (props.isHoveredWrapper ? {
        opacity: 1
    } : {})
]);

class DeclineButton extends React.Component<{ isHoveredWrapper?: boolean, userId: string }> {
    render() {
        return (
            <XPopper
                content="Decline request"
                showOnHover={true}
                placement="top-end"
                style="dark"
                padding={1}
            >
                <DeclineButtonWrapper isHoveredWrapper={this.props.isHoveredWrapper} query={{ field: 'remove', value: this.props.userId }}>
                    <CloseIcon />
                </DeclineButtonWrapper>
            </XPopper>
        );
    }
}

const Accept = withRoomAddMembers((props) => {
    return (
        <XMutation mutation={props.addMember}>
            <XButton
                style={((props as any).isHovered) ? 'primary' : 'default'}
                text="Accept"
            />
        </XMutation>
    );
}) as React.ComponentType<{ variables: { roomId: string, userId: string }, isHovered: boolean }>;

interface MemberItemProps {
    item: { status: SharedRoomMembershipStatus} & UserShort;
    roomId: string;
    removeFrom: string;
}

interface MemberItemState {
    isHovered: boolean;
    isHoveredDecline: boolean;
}

class MemberItem extends React.Component<MemberItemProps, MemberItemState> {
    constructor(props: MemberItemProps) {
        super(props);
        this.state = {
            isHovered: false,
            isHoveredDecline: false
        };
    }

    render() {
        let user = this.props.item;

        return (
            <div
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XUserCard
                    user={user}
                    customButton={(user.status === 'REQUESTED') ? (
                        <>
                            <Accept
                                variables={{ userId: user.id, roomId: this.props.roomId }}
                                isHovered={this.state.isHoveredDecline ? false : this.state.isHovered}
                            />
                            <div
                                onMouseEnter={() => this.setState({ isHoveredDecline: true })}
                                onMouseLeave={() => this.setState({ isHoveredDecline: false })}
                            >
                                <DeclineButton
                                    isHoveredWrapper={this.state.isHovered}
                                    userId={user.id}
                                />
                            </div>
                        </>
                    ) : undefined}
                    customMenu={(user.status === 'MEMBER') ? (
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={(
                                <XMenuItem style="danger" query={{ field: 'remove', value: user.id }}>
                                    {(user.isYou ? 'Leave the ' : 'Remove from ') + this.props.removeFrom}
                                </XMenuItem>
                            )}
                        />
                    ) : undefined}
                />
            </div>
        );
    }
}

export const RemoveMemberModal = withConversationKick((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.remove || '')[0];
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
            defaultAction={async (data) => {
                await props.kick({
                    variables: {
                        userId: member.user.id,
                        roomId: (props as any).roomId
                    }
                });
            }}
        >
            <XText>Are you sure you want to remove {member.user.firstName}? They will no longer be able to participate in the discussion.</XText>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[], roomId: string, roomTitle: string }>;

interface ChannelMembersComponentInnerProps {
    members: Room_room_SharedRoom_members[];
    channelTitle: string;
    roomId: string;
    description?: string | null;
    longDescription?: string | null;
    orgId: string;
    emptyText?: string;
    removeFrom: string;
}

export class RoomMembersComponent extends React.Component<ChannelMembersComponentInnerProps> {
    render() {
        
        let requests = this.props.members.filter(m => m.membership === 'REQUESTED');
        let members = this.props.members.filter(m => m.membership === 'MEMBER');

        return (
            <MembersWrapper>
                {this.props.longDescription && (
                    <>
                        <XSubHeader title="Description" />
                        {this.props.longDescription && <AboutText>{this.props.longDescription}</AboutText>}
                    </>
                )}
                {requests.length > 0 && <XWithRole role="admin" orgPermission={this.props.orgId}>
                    <XSubHeader title="Requests" counter={requests.length} />
                    <XContentWrapper>
                        {requests.map(m => (
                            <MemberItem
                                key={m.user.id}
                                item={{ status: m.membership as any, ...m.user }}
                                roomId={this.props.roomId}
                                removeFrom={this.props.removeFrom}
                            />
                        ))}
                    </XContentWrapper>
                </XWithRole>}
                <XSubHeader title="Members" counter={members.length} />
                <XContentWrapper>
                    {(members.length > 1) && members.map(m => (
                        <MemberItem
                            key={m.user.id}
                            item={{ status: m.membership as any, ...m.user }}
                            roomId={this.props.roomId}
                            removeFrom={this.props.removeFrom}
                        />
                    ))}
                </XContentWrapper>
                {(members.length <= 3) && this.props.emptyText && (
                    <EmptyComponent
                        orgId={this.props.orgId}
                        aloneMember={(members.length + requests.length) === 1}
                        smaller={members.length >= 2}
                        channelTitle={(this.props as any).channelTitle}
                        chatId={this.props.roomId}
                        text={this.props.emptyText}
                    />
                )}
                <RemoveMemberModal members={this.props.members} roomId={this.props.roomId} roomTitle={this.props.channelTitle} />
            </MembersWrapper >
        );
    }
}
