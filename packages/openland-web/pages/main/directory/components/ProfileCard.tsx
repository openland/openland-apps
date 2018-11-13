import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { User, User_user } from 'openland-api/Types';
import { withOnline } from '../../../../api/withOnline';
import { XDate } from 'openland-x-format/XDate';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const ProfileCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    backgroundColor: '#fff',
    padding: '12px 16px',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    height: 64,
    '&:hover': {
        backgroundColor: '#f9f9f9'
    },
    cursor: 'pointer'
})));

const ProfileContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
});

const ProfileInfoWrapper = Glamorous.div({
    flexGrow: 1,
});

const ProfileAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const ProfileName = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 600,
    letterSpacing: 0,
    color: '#000000!important',
    display: 'flex',
    marginTop: '-2px!important',
    marginBottom: 2,
});

const ProfileOrganization = Glamorous.div({
    fontSize: 12,
    lineHeight: '22px',
    fontWeight: 600,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 1,
    marginBottom: -1,
    marginLeft: 8,
});

const ProfileToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
});

interface ProfileCardProps {
    item: Partial<User_user>;
    onPick: (q: SearchCondition) => void;
}

const StatusWrapper = Glamorous.div<{ online: boolean }>((props) => ({
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px'
}));

const ProfileStatus = withOnline(props => {
    if (props.data.user && (props.data.user.lastSeen && props.data.user.lastSeen !== 'online' && !props.data.user.online)) {
        return (
            <StatusWrapper online={false}>
                Last seen {props.data.user.lastSeen === 'never_online' ? 'moments ago' : <XDate value={props.data.user.lastSeen} format="humanize_cute" />}
            </StatusWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return (
            <StatusWrapper online={true}>
                Online
            </StatusWrapper>
        );
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

export class ProfileCard extends React.Component<ProfileCardProps, { isHovered: boolean }> {
    constructor(props: ProfileCardProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let user = this.props.item;

        return (
            <ProfileCardWrapper
                path={'/directory/u/' + user.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={8}>
                    <XLink path={'/directory/u/' + user.id}>
                        <ProfileAvatar
                            cloudImageUuid={user.photo || undefined}
                            objectId={user.id}
                            objectName={user.name}
                            style="colorus"
                        />
                    </XLink>
                    <ProfileContentWrapper>
                        <ProfileInfoWrapper>
                            <ProfileName path={'/directory/u/' + user.id}>{user.name} {user.primaryOrganization && <ProfileOrganization>{user.primaryOrganization.name}</ProfileOrganization>}</ProfileName>
                            {user.id && <ProfileStatus variables={{ userId: user.id }}/>}
                        </ProfileInfoWrapper>
                        <ProfileToolsWrapper separator={5}>
                            {user.isYou
                                ? (<XButton
                                    style={this.state.isHovered ? 'primary' : 'default'}
                                    path={'/settings/profile'}
                                    text="Edit profile"
                                />)
                                : (<XButton
                                    style={this.state.isHovered ? 'primary' : 'default'}
                                    path={'/mail/' + user.id}
                                    text="Message"
                                />)
                            }
                        </ProfileToolsWrapper>
                    </ProfileContentWrapper>
                </XHorizontal>
            </ProfileCardWrapper>
        );
    }
}