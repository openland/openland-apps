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

interface MemberType {
    name: string;
    photo: string | null;
    members: string[];
    isMine: boolean;
    isAccepted: boolean;
}

// START: Example data

let RequestsArray: MemberType[] = [{
    name: 'Subway',
    photo: '',
    members: ['John Doe', 'John Doe', 'John Doe', 'John Doe'],
    isMine: false,
    isAccepted: false
}, {
    name: 'Subway',
    photo: '',
    members: ['John Doe'],
    isMine: false,
    isAccepted: false
}];

const MembersArray: MemberType[] = [{
    name: 'Subway',
    photo: '',
    members: ['John Doe', 'John Doe', 'John Doe', 'John Doe'],
    isMine: true,
    isAccepted: true
}, {
    name: 'Subway',
    photo: '',
    members: ['John Doe', 'John Doe', 'John Doe', 'John Doe'],
    isMine: false,
    isAccepted: true
}];

// END: Example data

const MembersWrapper = Glamorous(XScrollView)({
    height: 'calc(100vh - 56px)'
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

interface MemberItemProps {
    item: MemberType;
}

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

class MemberItem extends React.Component<MemberItemProps, { isHovered: boolean }> {
    constructor(props: MemberItemProps) {
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
                    cloudImageUuid={item.photo!!}
                    style="organization"
                />
                <MemberInfo>
                    <MemberName>{item.name}</MemberName>
                    <MemberStaff>{item.members[0] + ((item.members.length > 1) ? ' +' + (item.members.length - 1) + ' more' : '')}</MemberStaff>
                </MemberInfo>

                {item.isAccepted && (
                    <MemberTools separator={5}>
                        {item.isMine && (<XButton size="r-default" style="ghost" text="Your organization" />)}

                        <XOverflow
                            placement="bottom-end"
                            content={(
                                <XMenuItem style="danger">Remove from channel</XMenuItem>
                            )}
                        />
                    </MemberTools>
                )}

                {!item.isAccepted && (
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

export class MembersComponent extends React.Component {
    render() {
        return (
            <MembersWrapper>
                {RequestsArray.length > 0 && (
                    <>
                        <XSubHeader title="Requests" counter={RequestsArray.length} />
                        <MembersView>
                            {RequestsArray.map((member: MemberType) => (
                                <MemberItem item={member} />
                            ))}
                        </MembersView>
                    </>
                )}
                <XSubHeader title="Members" counter={MembersArray.length} />
                <MembersView>
                    {MembersArray.map((member: MemberType) => (
                        <MemberItem item={member} />
                    ))}
                </MembersView>
            </MembersWrapper>
        );
    }
}