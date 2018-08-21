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

const MembersWrapper = Glamorous(XScrollView)({
    height: '100%',
    width: '100%'
});

const MembersView = Glamorous.div({

});

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

class DeclineButton extends React.Component<{ isHoveredWrapper?: boolean }> {
    render() {
        return (
            <XPopper
                content="Decline request"
                showOnHover={true}
                placement="top-end"
                style="dark"
                padding={1}
            >
                <DeclineButtonWrapper isHoveredWrapper={this.props.isHoveredWrapper}>
                    <XIcon icon="close" />
                </DeclineButtonWrapper>
            </XPopper>
        );
    }
}

class MemberItem extends React.Component<{ item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShortFragment }, { isHovered: boolean }> {
    constructor(props: { item: { status: 'invited' | 'member' | 'requested' | 'none' } & UserShortFragment }) {
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
                                <XMenuItem style="danger">Remove from channel</XMenuItem>
                            )}
                        />
                    </MemberTools>
                )}

                {item.status === 'requested' && (
                    <MemberTools separator={6}>
                        <XButton
                            size="r-default"
                            style={(this.state.isHovered) ? 'primary-sky-blue' : 'default'}
                            text="Accept"
                        />
                        <DeclineButton isHoveredWrapper={this.state.isHovered} />
                    </MemberTools>
                )}
            </Member>
        );
    }
}

class ChannelMembersComponentInner extends React.Component<{ data: ChannelMembersQuery }> {
    render() {
        console.warn(this.props.data.members);
        if (!this.props.data || !this.props.data.members) {
            return <XLoader loading={true} />;
        }
        let requests = this.props.data.members.filter(m => m.status === 'requested');
        let members = this.props.data.members.filter(m => m.status === 'member');

        // todo remove 
        // requests = members.map(m => ({...m, status: 'requested'}));

        return (
            <MembersWrapper>
                {requests.length > 0 && (
                    <>
                        <XSubHeader title="Requests" counter={requests.length} />
                        <MembersView>
                            {requests.map(m => (
                                <MemberItem item={{ status: m.status as any, ...m.user }} />
                            ))}
                        </MembersView>
                    </>
                )}
                <XSubHeader title="Members" counter={members.length} />
                <MembersView>
                    {members.map(m => (
                        <MemberItem item={{ status: m.status as any, ...m.user }} />
                    ))}
                </MembersView>
            </MembersWrapper>
        );
    }
}

export const ChannelMembersComponent = withChannelMembers((props) => <ChannelMembersComponentInner data={props.data} />);