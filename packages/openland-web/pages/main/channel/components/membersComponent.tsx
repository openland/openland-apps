import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XButton } from 'openland-x/XButton';
import { XScrollView } from 'openland-x/XScrollView';
import { XPopper } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { withChannelMembers } from '../../../../api/withChannelMembers';
import { ChannelMembers, UserShort } from 'openland-api/Types';
import { XLoader } from 'openland-x/XLoader';
import { withChannelInvite } from '../../../../api/withChannelInvite';
import { XMutation } from 'openland-x/XMutation';
import { withConversationKick } from '../../../../api/withConversationKick';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { EmptyComponent } from './membersEmptyComponent';
import CloseIcon from './icons/ic-close-1.svg';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XText } from 'openland-x/XText';

const MembersWrapper = Glamorous(XScrollView)({
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

const Accept = withChannelInvite((props) => {
    return (
        <XMutation mutation={props.invite}>
            <XButton
                style={((props as any).isHovered) ? 'primary' : 'default'}
                text="Accept"
            />
        </XMutation>
    );
}) as React.ComponentType<{ variables: { channelId: string, userId: string }, refetchVars: { channelId: string, conversationId: string }, isHovered: boolean }>;

interface MemberItemProps {
    item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShort;
    channelId: string;
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
                    customButton={(user.status === 'requested') ? (
                        <>
                            <Accept
                                variables={{ userId: user.id, channelId: this.props.channelId }}
                                isHovered={this.state.isHoveredDecline ? false : this.state.isHovered}
                                refetchVars={{ channelId: this.props.channelId, conversationId: this.props.channelId }}
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
                    customMenu={(user.status === 'member') ? (
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
                        conversationId: (props as any).channelId
                    }
                });
            }}
        >
            <XText>Are you sure you want to remove {member.user.firstName}? They will no longer be able to participate in the discussion.</XText>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[], refetchVars: { channelId: string }, channelId: string, roomTitle: string }>;

interface ChannelMembersComponentInnerProps {
    data: ChannelMembers;
    channelTitle: string;
    channelId: string;
    description?: string | null;
    longDescription?: string | null;
    orgId: string;
    emptyText?: string;
    removeFrom: string;
}

class ChannelMembersComponentInner extends React.Component<ChannelMembersComponentInnerProps> {
    render() {
        if (!this.props.data || !this.props.data.members) {
            return <XLoader loading={true} />;
        }

        let requests = this.props.data.members.filter(m => m.status === 'requested');
        let members = this.props.data.members.filter(m => m.status === 'member');

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
                                item={{ status: m.status as any, ...m.user }}
                                channelId={this.props.channelId}
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
                            item={{ status: m.status as any, ...m.user }}
                            channelId={this.props.channelId}
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
                        chatId={this.props.channelId}
                        text={this.props.emptyText}
                    />
                )}
                <RemoveMemberModal members={this.props.data.members} refetchVars={{ channelId: this.props.channelId }} channelId={this.props.channelId} roomTitle={this.props.channelTitle} />
            </MembersWrapper >
        );
    }
}

export const ChannelMembersComponent = withChannelMembers((props) => {
    return (
        <ChannelMembersComponentInner
            data={props.data}
            channelTitle={(props as any).channelTitle}
            channelId={(props.variables as any).channelId}
            description={(props as any).description}
            longDescription={(props as any).longDescription}
            orgId={(props as any).orgId}
            emptyText={(props as any).emptyText}
            removeFrom={(props as any).removeFrom}
        />
    );
}) as React.ComponentType<{ removeFrom: string, emptyText?: string, channelTitle: string, variables: { channelId: string }, description?: string | null, longDescription?: string | null, orgId: string }>;