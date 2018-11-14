import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { User_user } from 'openland-api/Types';
import { withOnline } from '../../openland-web/api/withOnline';
import { XDate } from 'openland-x-format/XDate';

const UserWrapper = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: '12px 16px',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    height: 64,
    '&:hover': {
        backgroundColor: '#f9f9f9'
    }
})));

const UserAvatar = Glamorous(XAvatar)({
    cursor: 'pointer',
    '& *': {
        cursor: 'pointer!important'
    }
});

const UserContent = Glamorous(XHorizontal)({
    flexGrow: 1,
});

const UserInfo = Glamorous.div({
    flexGrow: 1,
});

const UserName = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 600,
    letterSpacing: 0,
    color: '#000000!important',
    display: 'flex',
    marginTop: '-2px!important',
    marginBottom: 2,
});

const UserOrganization = Glamorous.div({
    fontSize: 12,
    lineHeight: '22px',
    fontWeight: 600,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 1,
    marginBottom: -1,
    marginLeft: 8,
});

const UserTools = Glamorous(XHorizontal)({
    paddingTop: 4
});

const StatusWrapper = Glamorous.div<{ online: boolean }>((props) => ({
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px'
}));

const UserStatus = withOnline(props => {
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

interface XUserCardProps {
    user: Partial<User_user>;
    path?: string;
    customButton?: any;
    customMenu?: any;
}

interface XUserCardState {
    isHovered: boolean;
}

export class XUserCard extends React.Component<XUserCardProps, XUserCardState> {
    state = {
        isHovered: false,
    };

    render() {
        let { user, path, customButton, customMenu } = this.props;

        let button = (typeof customButton === 'undefined') ? (
            <>
                {user.isYou && (
                    <XButton
                        style="ghost"
                        text="You"
                        enabled={false}
                    />
                )}
                {!user.isYou && (
                    <XButton
                        style={this.state.isHovered ? 'primary' : 'default'}
                        path={'/mail/' + user.id}
                        text="Message"
                    />
                )}
            </>
        ) : customButton;

        let menu = (typeof customMenu === 'undefined') ? (
            <>
            </>
        ) : customMenu;

        return (
            <UserWrapper
                path={path || '/directory/u/' + user.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={8}>
                    <UserAvatar
                        cloudImageUuid={user.photo || undefined}
                        objectId={user.id}
                        objectName={user.name}
                        style="colorus"
                    />
                    <UserContent>
                        <UserInfo>
                            <UserName>
                                {user.name}
                                {user.primaryOrganization && <UserOrganization>{user.primaryOrganization.name}</UserOrganization>}
                            </UserName>
                            {user.id && <UserStatus variables={{ userId: user.id }}/>}
                        </UserInfo>
                        <UserTools separator={5}>
                            {button}
                            {menu}
                        </UserTools>
                    </UserContent>
                </XHorizontal>
            </UserWrapper>
        );
    }
}