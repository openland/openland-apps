import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { User_user } from 'openland-api/Types';
import { withOnline } from '../../openland-web/api/withOnline';
import { XPopper } from 'openland-x/XPopper';
import AdminIcon from 'openland-icons/ic-star-admin.svg';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XOverflow } from '../../openland-web/components/Incubator/XOverflow';
import { XDate } from 'openland-x/XDate';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { css } from 'linaria';

const StatusWrapperOffline = css`
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    line-height: 18px;
`;

const StatusWrapperOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 18px;
`;

const UserStatus = withOnline(props => {
    if (!props.data) {
        return null;
    }

    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <div className={StatusWrapperOffline}>
                {TextProfiles.User.status.lastSeen}{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    TextProfiles.User.status.momentsAgo
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (props.data.user && props.data.user.online) {
        return <div className={StatusWrapperOnline}>{TextProfiles.User.status.online}</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const AdminIconClass = css`
    & * {
        fill: #ffab00;
    }
`;

const AdminTooltip = () => (
    <XPopper
        placement="top"
        showOnHoverContent={false}
        showOnHover={true}
        style="dark"
        content={TextProfiles.Organization.roles.OWNER}
        marginBottom={6}
    >
        <XView marginRight={5} alignItems="center" justifyContent="center">
            <AdminIcon className={AdminIconClass} />
        </XView>
    </XPopper>
);

interface XUserCardProps {
    user: Partial<User_user>;
    path?: string;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
    isAdmin?: boolean;
    hideOrganization?: boolean;
}

interface XUserCardState {
    isHovered: boolean;
}

export class XUserCard extends React.Component<XUserCardProps, XUserCardState> {
    state = {
        isHovered: false,
    };

    render() {
        let {
            user,
            path,
            customButton,
            customMenu,
            extraMenu,
            isAdmin,
            hideOrganization,
        } = this.props;

        let button =
            typeof customButton === 'undefined' ? (
                <>
                    {user.isYou && (
                        <XButton 
                            style="ghost" 
                            text={TextProfiles.User.you} 
                            enabled={false}
                        />
                    )}
                    {!user.isYou && (
                        <XButton
                            style={this.state.isHovered ? 'primary' : 'default'}
                            path={'/mail/' + user.id}
                            text={TextProfiles.User.message}
                        />
                    )}
                </>
            ) : (
                customButton
            );

        let menu =
            typeof customMenu === 'undefined' ? (
                <>
                    {extraMenu && (
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={<div>{extraMenu}</div>}
                        />
                    )}
                </>
            ) : (
                customMenu
            );

        return (
            <XView
                cursor="pointer"
                backgroundColor="#ffffff"
                paddingVertical={12}
                paddingHorizontal={16}
                marginHorizontal={-16}
                borderRadius={8}
                height={64}
                hoverBackgroundColor="#f9f9f9"
                path={path || '/directory/u/' + user.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XView flexDirection="row" justifyContent="space-between">
                    <XAvatar2 src={user.photo} title={user.name || ''} id={user.id || ''} />
                    <XView flexDirection="row" flexGrow={1} marginLeft={16}>
                        <XView flexGrow={1} marginRight={12}>
                            <XView
                                flexDirection="row"
                                fontSize={14}
                                lineHeight="22px"
                                fontWeight="600"
                                color="#000000"
                                marginTop={-2}
                                marginBottom={2}
                            >
                                {isAdmin && <AdminTooltip />}
                                {user.name}
                                {!hideOrganization && user.primaryOrganization && (
                                    <XView
                                        fontSize={12}
                                        lineHeight="22px"
                                        fontWeight="600"
                                        color="rgba(0, 0, 0, 0.4)"
                                        marginTop={1}
                                        marginBottom={-1}
                                        marginLeft={8}
                                    >
                                        {user.primaryOrganization.name}
                                    </XView>
                                )}
                            </XView>
                            {user.id && <UserStatus variables={{ userId: user.id }} />}
                        </XView>
                        <XView 
                            flexDirection="row"
                            alignItems="center"
                        >
                            {button}
                            {(customMenu || extraMenu) && (
                                <XView marginLeft={10}>{menu}</XView>
                            )}
                        </XView>
                    </XView>
                </XView>
            </XView>
        );
    }
}
