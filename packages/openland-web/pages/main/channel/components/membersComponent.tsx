import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XButton } from 'openland-x/XButton';
import { XAvatar } from 'openland-x/XAvatar';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
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
import { XText } from 'openland-x/XText';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { EmptyComponent } from './membersEmptyComponent';
import CloseIcon from './icons/ic-close-1.svg';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';

const MembersWrapper = Glamorous(XScrollView)({
    height: '100%',
    width: '100%'
});

const MembersView = Glamorous.div({});

const Member = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    cursor: 'pointer',
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '16px 18px 15px 24px',
    '&:first-child': {
        paddingTop: 18
    },
    '&:hover': {
        backgroundColor: '#F9F9F9'
    }
})));

const MemberAvatar = Glamorous(XAvatar)({
    marginRight: 12
});

const MemberInfo = Glamorous.div({
    flex: 1
});

const MemberName = Glamorous.div({
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#5c6a81',
    marginBottom: 2
});

const MemberStaff = Glamorous.div({
    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 500,
    letterSpacing: -0.3,
    color: '#99a2b0'

});

const MemberTools = Glamorous(XHorizontal)({
    paddingTop: 4,
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

class MemberItem extends React.Component<{ item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShort, channelId: string, removeText?: string }, { isHovered: boolean, isHoveredDecline: boolean }> {
    constructor(props: { item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShort, channelId: string }) {
        super(props);
        this.state = {
            isHovered: false,
            isHoveredDecline: false
        };
    }

    render() {
        let item = this.props.item;

        return (
            <Member
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
                path={'/mail/u/' + item.id}
            >
                <MemberAvatar
                    cloudImageUuid={item.picture || undefined}
                    objectId={item.id}
                    style="user"
                    objectName={item.name}
                />
                <MemberInfo>
                    <MemberName>{item.name}</MemberName>
                    <MemberStaff>{item.primaryOrganization && item.primaryOrganization.name}</MemberStaff>
                </MemberInfo>

                {item.status === 'member' && (
                    <MemberTools separator={5}>
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={(
                                <XMenuItem style="danger" query={{ field: 'remove', value: item.id }}>{this.props.removeText || 'Remove from channel'}</XMenuItem>
                            )}
                        />
                    </MemberTools>
                )}

                {item.status === 'requested' && (
                    <MemberTools separator={6}>
                        <Accept
                            variables={{ userId: item.id, channelId: this.props.channelId }}
                            isHovered={this.state.isHoveredDecline ? false : this.state.isHovered}
                            refetchVars={{ channelId: this.props.channelId, conversationId: this.props.channelId }}
                        />
                        <div
                            onMouseEnter={() => this.setState({ isHoveredDecline: true })}
                            onMouseLeave={() => this.setState({ isHoveredDecline: false })}
                        >
                            <DeclineButton
                                isHoveredWrapper={this.state.isHovered}
                                userId={item.id}
                            />
                        </div>
                    </MemberTools>
                )}
            </Member>
        );
    }
}

const RemoveMemberModal = withConversationKick((props) => {
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
            title="Remove member"
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
            <XHorizontal>
                <XAvatar
                    size="medium"
                    style="colorus"
                    cloudImageUuid={member.user.picture || undefined}
                    objectId={member.user.id}
                    objectName={member.user.name}
                />
                <XVertical separator={4} justifyContent="center">
                    <XText textStyle="h500">{member.user.name}</XText>
                    {member.primaryOrganization && <XText opacity={0.5} >{member.primaryOrganization.name}</XText>}
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[], refetchVars: { channelId: string }, channelId: string }>;

interface ChannelMembersComponentInnerProps {
    data: ChannelMembers;
    channelTitle: string;
    channelId: string;
    description?: string;
    longDescription?: string;
    orgId: string;
    emptyText?: string;
    removeText?: string;
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
                {requests.length > 0 && < XWithRole role="admin" orgPermission={this.props.orgId}>
                    <XSubHeader title="Requests" counter={requests.length} />
                    <MembersView>
                        {requests.map(m => (
                            <MemberItem key={m.user.id} item={{ status: m.status as any, ...m.user }} channelId={this.props.channelId} />
                        ))}
                    </MembersView>
                </XWithRole>}
                <XSubHeader title="Members" counter={members.length} />
                <MembersView>
                    {(members.length > 1) && members.map(m => (
                        <MemberItem
                            key={m.user.id}
                            item={{ status: m.status as any, ...m.user }}
                            channelId={this.props.channelId}
                            removeText={this.props.removeText}
                        />
                    ))}
                </MembersView>
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
                <RemoveMemberModal members={this.props.data.members} refetchVars={{ channelId: this.props.channelId }} channelId={this.props.channelId} />
            </MembersWrapper >
        );
    }
}

export const ChannelMembersComponent = withChannelMembers((props) => (
    <ChannelMembersComponentInner
        data={props.data}
        channelTitle={(props as any).channelTitle}
        channelId={(props.variables as any).channelId}
        description={(props as any).description}
        longDescription={(props as any).longDescription}
        orgId={(props as any).orgId}
        emptyText={(props as any).emptyText}
        removeText={(props as any).removeText}
    />
)) as React.ComponentType<{ removeText?: string, emptyText?: string, channelTitle: string, variables: { channelId: string }, description?: string, longDescription?: string, orgId: string }>;