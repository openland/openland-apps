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
import { XIcon } from 'openland-x/XIcon';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { withChannelMembers } from '../../../../api/withChannelMembers';
import { ChannelMembersQuery, UserShortFragment } from 'openland-api/Types';
import { XLoader } from 'openland-x/XLoader';
import { withChannelInvite } from '../../../../api/withChannelInvite';
import { XMutation } from 'openland-x/XMutation';
import { withConversationKick } from '../../../../api/withConversationKick';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XText } from 'openland-x/XText';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { EmptyComponent } from './membersEmptyComponent';

const MembersWrapper = Glamorous(XScrollView)({
    height: '100%',
    width: '100%'
});

const MembersView = Glamorous.div({});

const Member = Glamorous.div({
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '16px 18px 15px 24px',
    '&:first-child': {
        paddingTop: 18
    },
    '&:hover': {
        backgroundColor: '#f9fafb'
    }
});

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

const DeclineButtonWrapper = Glamorous(XLink)<{ isHoveredWrapper?: boolean }>([
    {
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: .5,

        '& i': {
            fontSize: 16,
            color: '#bcc3cc'
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
                    <XIcon icon="close" />
                </DeclineButtonWrapper>
            </XPopper>
        );
    }
}

const Accept = withChannelInvite((props) => {
    return (
        <XMutation mutation={props.invite}>
            <XButton
                size="r-default"
                style={((props as any).isHovered) ? 'primary-sky-blue' : 'default'}
                text="Accept"
            />
        </XMutation>
    );
}) as React.ComponentType<{ variables: { channelId: string, userId: string }, refetchVars: { channelId: string }, isHovered: boolean }>;

class MemberItem extends React.Component<{ item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShortFragment, channelId: string }, { isHovered: boolean }> {
    constructor(props: { item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShortFragment, channelId: string }) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let item = this.props.item;

        return (
            <Member
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <MemberAvatar
                    cloudImageUuid={item.picture || undefined}
                />
                <MemberInfo>
                    <MemberName>{item.name}</MemberName>
                    <MemberStaff>{item.primaryOrganization && item.primaryOrganization.name}</MemberStaff>
                </MemberInfo>

                {item.status === 'member' && (
                    <MemberTools separator={5}>

                        <XOverflow
                            placement="bottom-end"
                            content={(
                                <XMenuItem style="danger" query={{ field: 'remove', value: this.props.item.id }}>Remove from channel</XMenuItem>
                            )}
                        />
                    </MemberTools>
                )}

                {item.status === 'requested' && (
                    <MemberTools separator={6}>
                        <Accept variables={{ userId: item.id, channelId: this.props.channelId }} isHovered={this.state.isHovered} refetchVars={{ channelId: this.props.channelId }} />
                        <DeclineButton isHoveredWrapper={this.state.isHovered} userId={item.id} />
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
    console.warn(member);
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
                <XAvatar size="medium" cloudImageUuid={member.user.picture || undefined} />
                <XVertical separator={4} justifyContent="center">
                    <XText textStyle="h500">{member.user.name}</XText>
                    {member.primaryOrganization && <XText opacity={0.5} >{member.primaryOrganization.name}</XText>}
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[], refetchVars: { channelId: string }, channelId: string }>;

class ChannelMembersComponentInner extends React.Component<{ data: ChannelMembersQuery, channelTitle: string, channelId: string, isMyOrganization: boolean }> {
    render() {
        if (!this.props.data || !this.props.data.members) {
            return <XLoader loading={true} />;
        }

        console.warn(this.props.data.members);
        let requests = this.props.data.members.filter(m => m.status === 'requested');
        let members = this.props.data.members.filter(m => m.status === 'member');

        // for tests
        // requests = members.map(m => ({ ...m, status: 'requested' }));

        return (
            <MembersWrapper>
                {this.props.isMyOrganization && requests.length > 0 && (
                    <XWithRole role="admin" orgPermission={true}>
                        <XSubHeader title="Requests" counter={requests.length} />
                        <MembersView>
                            {requests.map(m => (
                                <MemberItem key={m.user.id} item={{ status: m.status as any, ...m.user }} channelId={this.props.channelId} />
                            ))}
                        </MembersView>
                    </XWithRole>
                )}
                <XSubHeader title="Members" counter={members.length} />
                <MembersView>
                    {(members.length > 1) && members.map(m => (
                        <MemberItem key={m.user.id} item={{ status: m.status as any, ...m.user }} channelId={this.props.channelId} />
                    ))}
                </MembersView>
                {console.log('chatTitle ---- ', (this.props as any).channelTitle)}
                {(members.length <= 3) && (
                    <EmptyComponent
                        aloneMember={members.length === 1}
                        smaller={members.length >= 2}
                        channelTitle={(this.props as any).channelTitle}
                        chatId={this.props.channelId}
                    />
                )}
                <RemoveMemberModal members={members} refetchVars={{ channelId: this.props.channelId }} channelId={this.props.channelId} />
            </MembersWrapper>
        );
    }
}

export const ChannelMembersComponent = withChannelMembers((props) => (
    <ChannelMembersComponentInner
        data={props.data}
        channelTitle={(props as any).channelTitle}
        channelId={(props.variables as any).channelId}
        isMyOrganization={(props as any).isMyOrganization}
    />
)) as React.ComponentType<{ channelTitle: string, variables: { channelId: string } }>;